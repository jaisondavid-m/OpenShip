package routes

import (
	"database/sql"

	"github.com/gin-gonic/gin"

	"server/handlers"
)

func Register(r *gin.Engine, database *sql.DB) {

	healthHandler := handlers.NewHealthHandler(database)

	api := r.Group("/api")

	v1 := api.Group("/v1")
	{
		v1.GET("/health", healthHandler.Health)
	}

}