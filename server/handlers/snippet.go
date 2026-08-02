package handlers

import (
	"database/sql"
	"errors"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"

	"server/db"
	"server/models"
	"server/utils"
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

	var slugValue *string 

	if input.Slug != nil && strings.TrimSpace(*input.Slug) != "" {

		normalized, err := utils.NormalizeSlug(*input.Slug)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return 
		}

		slugValue = &normalized

	}

	res, err := db.DB.Exec("INSERT INTO snippets (code, slug) VALUES (?, ?)", input.Code, slugValue)

	if err != nil {

		var mysqlErr *mysql.MySQLError

		if errors.As(err, &mysqlErr) && mysqlErr.Number == 1062 {
			c.JSON(http.StatusConflict, gin.H{
				"error": "that slug is already taken",
			})
			return 
		}

		// if ok := (func() bool { var e2 error = err; me, isMe := e2.(*mysql.MySQLError); mysqlErr = me; return isMe })(); ok && mysqlErr.Number == 1062 {
		// 	c.JSON(http.StatusConflict, gin.H{
		// 		"error": "that slug is already taken",
		// 	})
		// 	return 
		// }

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
		"slug": slugValue,
	})

}

func GetSnippet(c *gin.Context) {

	id := c.Param("id")

	var snippet models.Snippet
	var slugCol sql.NullString

	row := db.DB.QueryRow("SELECT id, code, slug, created_at, updated_at FROM snippets WHERE id = ?", id)

	err := row.Scan(&snippet.ID, &snippet.Code, &slugCol, &snippet.CreatedAt, &snippet.UpdatedAt)

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

	if slugCol.Valid {
		snippet.Slug = &slugCol.String
	}

	c.JSON(http.StatusOK, gin.H{
		"snippet": snippet,
	})

}