package handlers

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"server/config"
	"server/db"
	"server/models"
	"server/utils"
)

func ForgotPassword(c *gin.Context) {

	var userID uint
	var input models.ForgotPasswordInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := db.DB.QueryRow(
		"SELECT id FROM users WHERE email = ?",
		input.Email,
	).Scan(&userID)

	if err != nil {

		if err == sql.ErrNoRows {
			c.JSON(http.StatusOK, gin.H{
				"message": "If that email is registered, an OTP has been sent",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "database error",
		})

		return

	}

	// var userID uint
	// err := db.DB.QueryRow("SELECT id FROM users WHERE email = ?", input.Email).Scan(&userID)

	otp, err := utils.GenerateOTP()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to generate otp",
		})
		return
	}

	otpHash, err := utils.HashPassword(otp)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to press otp",
		})
		return
	}

	expiresAt := time.Now().Add(time.Duration(config.OTPExipryMinutes) * time.Minute)

	if _, err := db.DB.Exec("DELETE FROM password_resets WHERE email = ?", input.Email); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to process request",
		})
		return
	}

	_, err = db.DB.Exec(
		"INSERT INTO password_resets (email, otp_hash, expires_at) VALUES (?, ?, ?)",
		input.Email, otpHash, expiresAt,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to save otp",
		})
		return
	}

	if err := utils.SendOTPEmail(input.Email, otp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to send otp email",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "an OTP has been sent successfully",
	})

}
