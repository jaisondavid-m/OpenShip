package models

import "time"

type Role string

const (
	RoleAdmin Role = "admin"
	RoleUser Role = "user"
)

type User struct {
	ID 			uint 		`json:"id"`
	Name 		string 		`json:"name"`
	Email 		string 		`json:"email"`
	Password 	string 		`json:"-"`
	Role 		Role 		`json:"role"`
	Avatar 		*string 	`json:"avatar"`
	CreatedAt 	time.Time 	`json:"created_at"`
	UpdatedAt 	time.Time 	`json:"updated_at"`
}

type LoginInput struct {
	Email 		string 		`json:"email" binding:"required,email"`
	Password 	string 		`json:"password" binding:"required"`
}

type RegisterInput struct {
	Name 		string 		`json:"name" binding:"required"`
	Email 		string 		`json:"email" binding:"required,email"`
	Password 	string 		`json:"password" binding:"required,min=6"`
}