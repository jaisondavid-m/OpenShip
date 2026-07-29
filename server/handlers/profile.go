package handlers

import (

	"net/http"
	"database/sql"
	// "path/filepath"

	"server/db"
	"server/models"
	"server/helper"

	"github.com/gin-gonic/gin"

)

func GetProfile(c *gin.Context) {

	uid, ok := helper.GetUserID(c)

	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "invalid user",
		})
		return 
	}

	var user models.User
	var avatar sql.NullString

	row := db.DB.QueryRow(
		"SELECT id, name, email, role, avatar, created_at, updated_at FROM users WHERE id = ?",
		uid,
	)

	err := row.Scan(&user.ID, &user.Name, &user.Email, &user.Role, &avatar, &user.CreatedAt, &user.UpdatedAt)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "user not found",
		})
		return 
	}

	if avatar.Valid {
		user.Avatar = &avatar.String
	}

	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})

}