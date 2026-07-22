package main

import (

	"log"

	"github.com/gin-gonic/gin"

	"server/config"
	"server/db"
	"server/routes"

)

func main() {

	cfg := config.Load()

	database, err := db.New(cfg)

	if err != nil {
		log.Fatalf("failed to connect to database: %v",err)
	}

	defer database.Close()

	if cfg.AppEnv == "producation" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()

	routes.Register(r, database)

	addr := ":" + cfg.AppPort

	log.Printf("starting server on %s (env=%s)", addr, cfg.AppEnv)

	if err := r.Run(addr); err != nil {
		log.Fatalf("server error: %v", err)
	}

}