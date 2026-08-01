package models

import "time"

type Snippet struct {
	ID 			uint 		`json:"id"`
	Code 		string 		`json:"code"`
	CreatedAt 	time.Time 	`json:"created_at"`
	UpdatedAt 	time.Time 	`json:"updated_at"`
}

type SaveSnippetInput struct {
	Code 		string		`json:"code" binding:"required"`
}