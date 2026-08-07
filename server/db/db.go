package db

import (

	"os"
	"fmt"
	"time"
	"crypto/tls"
	"crypto/x509"
	"database/sql"

	"github.com/go-sql-driver/mysql"

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

func ConnectTiDB(dsn string, caCertPath string) error {

	rootCertPool := x509.NewCertPool()

	pem, err := os.ReadFile(caCertPath)

	if err != nil {
		return fmt.Errorf("failed to read CA cert: %w",err)
	}

	if ok := rootCertPool.AppendCertsFromPEM(pem); !ok {
		return fmt.Errorf("failed to append CA cert to pool")
	}

	if err := mysql.RegisterTLSConfig("tidb",&tls.Config{
		RootCAs: rootCertPool,
		MinVersion: tls.VersionTLS12,
	}); err != nil {
		return fmt.Errorf("failed to register tls config: %w", err)
	}

	conn, err := sql.Open("mysql", dsn)

	if err != nil {
		return err
	}

	conn.SetMaxOpenConns(25)
	conn.SetMaxIdleConns(25)
	conn.SetConnMaxIdleTime(5*time.Minute)

	if err := conn.Ping(); err != nil {
		return err
	}

	DB = conn

	return nil

}