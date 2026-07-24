package handlers

import (

	"net/http"

	"server/db"
	"server/models"
	"server/utils"

	"github.com/gin-gonic/gin"

)

func Register(c *gin.Context) {

	var input models.RegisterInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	hashedPassword, err := utils.HashPassword(input.Password)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to hash password",
		})
		return
	}

	_, err = db.DB.Exec(
		"INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
		input.Name, input.Email, hashedPassword, "user",
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "email may already be registered",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Registered Successfully",
	})

}

func Me(c *gin.Context) {

	userID, _ := c.Get("user_id")
	role, _ := c.Get("role")

	c.JSON(http.StatusOK, gin.H{
		"user_id": userID,
		"role": role,
	})

}