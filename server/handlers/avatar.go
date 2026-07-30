package handlers

import (

	"os"
	"fmt"
	"time"
	"strings"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"

	"server/db"
	// "server/models"
	"server/helper"

)

func UploadAvatar(c *gin.Context) {

	uid, ok := helper.GetUserID(c)

	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "invalid user",
		})
		return 
	}

	file, err := c.FormFile("avatar")

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "avatar file is required",
		})
		return 
	}

	ext := strings.ToLower(filepath.Ext(file.Filename))

	allowed := map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".webp": true}

	if !allowed[ext] {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "unsupported file type",
		})
		return 
	}

	const maxSize = 5 << 20

	if file.Size > maxSize {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "file too large (max 5MB)",
		})
		return 
	}

	if err := os.MkdirAll("./uploads/avatars",0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to prepare upload directory",
		})
		return 
	}

	filename := fmt.Sprintf("user_%d_%d%s", uid, time.Now().Unix(), ext)

	dst := filepath.Join("uploads","avatars",filename)

	if err := c.SaveUploadedFile(file, dst); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to save file",
		})
		return 
	}

	publicPath := "/uploads/avatars/" + filename

	if _, err := db.DB.Exec("UPDATE users SET avatar = ? WHERE id = ?", publicPath, uid); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to update profile",
		})
		return 
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "avatar updated",
		"avatar": publicPath,
	})

}