package utils

import (
	"fmt"
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

func GenerateResetToken(email string) (string, error) {

	claims := jwt.MapClaims{
		"email": email,
		"purpose": "password_reset",
		"exp": time.Now().Add(10*time.Minute).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(config.JWTSecret))

}

func ParseResetToken(tokenString string) (jwt.MapClaims, error) {

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(config.JWTSecret), nil
	})

	if err != nil || !token.Valid {
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)

	if !ok {
		return nil, fmt.Errorf("invalid claims")
	}

	if claims["purpose"] != "password_reset" {
		return nil, fmt.Errorf("invalid token purpose")
	}

	return claims, nil

}