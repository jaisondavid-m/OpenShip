package handlers

import (

	"time"
	"net/http"
	"database/sql"

	"github.com/gin-gonic/gin"

	// "server/config"
	"server/models"
	"server/db"
	"server/utils"

)

func VerifyOTP(c *gin.Context) {

	var input models.VerifyOTPInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return 
	}

	var otpHash string
	var expiresAt time.Time
	var used bool

	row := db.DB.QueryRow(
		"SELECT otp_hash, expires_at, used FROM password_resets WHERE email = ? ORDER BY id DESC LIMIT 1",
		input.Email,
	)

	err := row.Scan(&otpHash, &expiresAt, &used)

	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid or expired otp",
			})
			return 
		}
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to verify otp",
		})
		return 
	}

	if used || time.Now().After(expiresAt) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid or expires otp",
		})
		return
	}

	if !utils.CheckPassword(otpHash, input.OTP) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid or expired otp",
		})
		return 
	}

	if _, err := db.DB.Exec("UPDATE password_resets SET used = TRUE WHERE email = ?", input.Email); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to verify otp",
		})
		return
	}

	resetToken, err := utils.GenerateResetToken(input.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to generate reset token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "otp verified",
		"reset_token": resetToken,
	})

}