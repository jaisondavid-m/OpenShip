package handlers

import (

	"net/http"
	"database/sql"

	"github.com/gin-gonic/gin"

	"server/db"
	"server/models"

)

const maxSnippetSize = 1000 << 10

func SaveSnippet(c *gin.Context) {

	var input models.SaveSnippetInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return 
	}

	if len(input.Code) > maxSnippetSize {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "code exceeds max size of 1MB",
		})
		return 
	}

	res, err := db.DB.Exec("INSERT INTO snippets (code) VALUES (?)", input.Code)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to save snippet",
		})
		return 
	}

	id, err := res.LastInsertId()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to save snippet",
		})
		return 
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "snippet saved",
		"id": id,
	})

}

func GetSnippet(c *gin.Context) {

	id := c.Param("id")

	var snippet models.Snippet

	row := db.DB.QueryRow("SELECT id, code, created_at, updated_at FROM snippets WHERE id = ?", id)

	err := row.Scan(&snippet.ID, &snippet.Code, &snippet.CreatedAt, &snippet.UpdatedAt)

	if err != nil {

		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "snippet not found",
			})
			return 
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to fetch snippet",
		})
		return 

	}

	c.JSON(http.StatusOK, gin.H{
		"snippet": snippet,
	})

}