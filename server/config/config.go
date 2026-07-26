package config

import (

	"fmt"
	"os"
	"strconv"

	"github.com/joho/godotenv"

)

var (
	AppPort 	string
	AppEnv 		string
	DBHost 		string
	DBPort 		string
	DBUser 		string
	DBPassword 	string
	DBName 		string
	JWTSecret 	string
	CorsOrigin 	string

	SMTPHost 			string
	SMTPPort 			string
	SMTPUser 			string
	SMTPPassword 		string
	SMTPFrom 			string
	OTPExipryMinutes 	int
)

func init() {

	godotenv.Load()
	
	AppPort		= getEnv("APP_PORT","8080")
	AppEnv		= getEnv("APP_ENV","development")

	CorsOrigin 	= getEnv("CORS_ORIGIN","http://localhost:5173")

	DBHost 		= getEnv("DB_HOST","localhost")
	DBPort		= getEnv("DB_PORT","3306")
	DBUser		= getEnv("DB_USER","root")
	DBPassword 	= getEnv("DB_PASSWORD","")
	DBName		= getEnv("DB_NAME","open_ship")

	JWTSecret 	= getEnv("JWT_SECRET","testingkeyfortestingpurpose")

	//for checking currently commented this
	SMTPHost = getEnv("SMTP_HOST","smtp.gmail.com")
	SMTPPort = getEnv("SMTP_PORT", "587")
	SMTPUser = getEnv("SMTP_USER", "")
	SMTPPassword = getEnv("SMTP_PASSWORD","")
	SMTPFrom = getEnv("SMTP_FROM", "jaison7373@gmail.com")
	OTPExipryMinutes = getEnvInt("OTP_EXPIRY_MINUTES",10)

}

func getEnv(key, fallback string) string {

	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}

	return fallback

}

func getEnvInt(key string, fallback int) int {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		if i, err := strconv.Atoi(v); err == nil {
			return i
		}
	}
	return fallback
}

func DSN() string {
	
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?parseTime=true&charset=utf8mb4&loc=Local",
		DBUser, DBPassword, DBHost, DBPort, DBName,
	)

}