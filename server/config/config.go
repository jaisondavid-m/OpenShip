package config

import (

	"fmt"
	"log"
	"os"
	
	"github.com/joho/godotenv"

)

func Load() *Config {

	if err := godotenv.Load(); err != nil {
		log.Println("no .env file found, relying on system environment variables")
	}

	cfg := &Config{
		AppPort: getEnv("APP_PORT","8080"),
		AppEnv: getEnv("APP_ENV","development"),
		DBHost: getEnv("DB_HOST","localhost"),
		DBPort: getEnv("DB_PORT","3306"),
		DBUser: getEnv("DB_USER","root"),
		DBPassword: getEnv("DB_PASSWORD",""),
		DBName: getEnv("DB_NAME","open_ship"),
	}

	return cfg

}

func getEnv(key, fallback string) string {

	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}

	return fallback

}

func (c *Config) DSN() string {
	
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?parseTime=true&charset=utf8mb4&loc=Local",
		c.DBUser, c.DBPassword, c.DBHost, c.DBPort, c.DBName,
	)

}