package handlers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

type HealthHandler struct {
	DB *sql.DB
}

func NewHealthHandler(db *sql.DB) *HealthHandler {
	return &HealthHandler{DB: db}
}

func (h *HealthHandler) Health(c *gin.Context) {

	status := gin.H{
		"status": "ok",
		"db": "ok",
	}

	if err := h.DB.Ping(); err != nil {
		status["status"] = "degraded"
		status["db"] = "unreachable"
		status["error"] = err.Error()
		c.JSON(http.StatusServiceUnavailable, status)
		return
	}

	c.JSON(http.StatusOK, status)

}