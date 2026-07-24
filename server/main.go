package main

import (
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	// "github.com/joho/godotenv"

	"server/config"
	"server/db"
	"server/routes"
)

func main() {

	// godotenv.Load()
	
	if err := db.Connect(config.DSN()); err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	defer db.DB.Close()

	if config.AppEnv == "producation" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
		},
		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"DELETE",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Authorization",
		},
		ExposeHeaders: []string{
			"Content-Length",
		},
		AllowCredentials: true,
		MaxAge: 12 * time.Hour,
	}))

	routes.Register(r)

	addr := ":" + config.AppPort

	log.Printf("starting server on %s (env=%s)", addr, config.AppEnv)

	if err := r.Run(addr); err != nil {
		log.Fatalf("server error: %v", err)
	}

}