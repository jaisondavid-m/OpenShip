package handlers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	// "github.com/go-sql-driver/mysql"

	"server/db"
	"server/models"
)

func GetPublicSnippetBySlug(c *gin.Context) {

	slug := c.Param("slug")

	var snippet models.Snippet
	var slugCol sql.NullString

	row := db.DB.QueryRow("SELECT id, code, slug, created_at, updated_at FROM snippets WHERE slug = ?", slug)

	err := row.Scan(&snippet.ID, &snippet.Code, &slugCol, &snippet.CreatedAt, &snippet.UpdatedAt)

	if err != nil {

		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{
				"error": "page not found",
			})
			return 
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to fetch page",
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