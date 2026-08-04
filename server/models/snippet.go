package models

import "time"

type Snippet struct {
	ID 			uint 		`json:"id"`
	UserID 		uint 		`json:"user_id,omitempty"`
	Slug 		*string		`json:"slug"`
	Code 		string 		`json:"code"`
	CreatedAt 	time.Time 	`json:"created_at"`
	UpdatedAt 	time.Time 	`json:"updated_at"`
}

type SaveSnippetInput struct {
	Code 		string		`json:"code" binding:"required"`
	Slug		*string 	`json:"slug"`
}