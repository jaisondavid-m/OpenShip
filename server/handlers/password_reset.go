package handlers

import (
	"database/sql"
	"fmt"
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
			// "error": "Failed to save otp",
			"error":err.Error(),
		})
		return
	}

	if err := utils.SendOTPEmail(input.Email, otp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			// "error": "Failed to send otp email",
			"error":err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "an OTP has been sent successfully",
	})

}

func ResetPassword(c *gin.Context) {

	var input models.ResetPasswordInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	claims, err := utils.ParseResetToken(input.ResetToken)
	if err != nil {
		fmt.Println("reset tkn err: ", err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid or expired reset token",
		})
		return
	}

	email, ok := claims["email"].(string)

	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid reset token",
		})
		return 
	}

	hashedPassword, err := utils.HashPassword(input.NewPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to hash password",
		})
		return
	}

	result, err := db.DB.Exec("UPDATE users SET password = ? WHERE email = ?", hashedPassword, email)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to update password",
		})
		return
	}

	if rows, _ := result.RowsAffected(); rows == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "user not found",
		})
		return 
	}

	_, _ = db.DB.Exec("DELETE FROM password_resets WHERE email = ?", email)

	var user models.User

	row := db.DB.QueryRow("SELECT id, name, email, role FROM users WHERE email = ?",email)

	if err := row.Scan(&user.ID, &user.Name, &user.Email, &user.Role); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":"failed to load user",
		})
		return 
	}

	token, err := utils.GenerateToken(user.ID, string(user.Role))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to generate token",
		})
		return 
	}

	c.SetCookie("token", token, 3600*24, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "password reset successfully",
		"user": gin.H{
			"id": user.ID,
			"name": user.Name,
			"email": user.Email,
			"role": user.Role,
		},
	})

}