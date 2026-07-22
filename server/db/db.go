package db

import (

	"time"
	"database/sql"

	_ "github.com/go-sql-driver/mysql"

	"server/config"

)

func New(cfg *config.Config) (*sql.DB, error) {

	conn, err := sql.Open("mysql",cfg.DSN())

	if err != nil {
		return nil, err
	}

	conn.SetMaxOpenConns(25)
	conn.SetMaxIdleConns(25)
	conn.SetConnMaxIdleTime(5 * time.Minute)

	if err := conn.Ping(); err != nil {
		return nil, err
	}

	return conn, nil

}