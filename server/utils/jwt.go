package utils

import (
	
	"time"

	"server/config"

	"github.com/golang-jwt/jwt/v5"
	
)

func GenerateToken(userID uint, role string) (string, error) {

	claims := jwt.MapClaims{
		"user_id": userID,
		"role": role,
		"exp": time.Now().Add(24*time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(config.JWTSecret))

}

func ParseToken(tokenString string) (jwt.MapClaims, error) {

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(config.JWTSecret), nil
	})

	if err != nil || !token.Valid {
		return nil, err
	}

	claims, _ := token.Claims.(jwt.MapClaims)

	return claims, nil

}