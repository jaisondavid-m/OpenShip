package db

import (

	"time"
	"database/sql"

	_ "github.com/go-sql-driver/mysql"

)

var DB *sql.DB

func Connect(dsn string) error {

	conn, err := sql.Open("mysql",dsn)

	if err != nil {
		return err
	}

	conn.SetMaxOpenConns(25)
	conn.SetMaxIdleConns(25)
	conn.SetConnMaxIdleTime(5 * time.Minute)

	if err := conn.Ping(); err != nil {
		return err
	}

	DB = conn

	return nil

}