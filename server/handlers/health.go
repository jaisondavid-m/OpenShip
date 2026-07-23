package handlers

import (
	
	"net/http"
	
	"server/db"

	"github.com/gin-gonic/gin"
)

func Health(c *gin.Context) {

	status := gin.H{
		"status": "ok",
		"db": "ok",
	}

	if err := db.DB.Ping(); err != nil {
		status["status"] = "degraded"
		status["db"] = "unreachable"
		status["error"] = err.Error()
		c.JSON(http.StatusServiceUnavailable, status)
		return
	}

	c.JSON(http.StatusOK, status)

}