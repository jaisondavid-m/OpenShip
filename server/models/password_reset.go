package models

type ForgotPasswordInput struct {
	Email 	string 		`json:"email" binding:"required,email"`
}

type VerifyOTPInput struct {
	Email 	string		`json:"email" binding:"required,email"`
	OTP 	string		`json:"otp" `
}

type ResetPasswordInput struct {
	ResetToken 		string		`json:"reset_token" binding:"required"`
	NewPassword 	string		`json:"new_password" binding:"required,min=6"`
}