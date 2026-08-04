package handlers

import (
	"time"
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"

	"server/db"
)

func ListSnippets(c *gin.Context) {

	userID, ok := getUserID(c)

	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "login required",
		})
		return 
	}

	rows, err := db.DB.Query(
		"SELECT id, slug, created_at, updated_at FROM snippets WHERE user_id = ? ORDER BY updated_at DESC",
		userID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to fetch snippets",
		})
		return 
	}

	defer rows.Close()

	snippets := []gin.H{}

	for rows.Next() {

		var id uint
		var slugCol sql.NullString
		var createdAt, updatedAt time.Time

		if err := rows.Scan(&id, &slugCol, &createdAt, &updatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "failed to read snippets",
			})
			return 
		}

		var slug *string

		if slugCol.Valid {
			slug = &slugCol.String
		}

		snippets = append(snippets, gin.H{
			"id": id,
			"slug": slug,
			"created_at": createdAt,
			"updated_at": updatedAt,
		})

	}

	c.JSON(http.StatusOK, gin.H{
		"snippets": snippets,
	})

}


func DeleteSnippet(c *gin.Context) {

	userID, ok := getUserID(c)

	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "login required",
		})
		return 
	}

	id := c.Param("id")

	res, err := db.DB.Exec("DELETE FROM snippets WHERE id = ? AND user_id = ?", id, userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to delete snippet",
		})
		return 
	}

	affected, err := res.RowsAffected()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to delete snippet",
		})
		return 
	}

	if affected == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "snippet not found",
		})
		return 
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "snippet deleted",
	})

}