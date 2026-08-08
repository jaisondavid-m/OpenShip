package db

import (
	"crypto/tls"
	"crypto/x509"
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"server/config"
	"time"

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

	if !filepath.IsAbs(caCertPath) {
		exePath, _ := os.Getwd()
		caCertPath = filepath.Join(exePath, caCertPath)
	}

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
		ServerName: config.DBHost,
	}); err != nil {
		return fmt.Errorf("failed to register tls config: %w", err)
	}

	conn, err := sql.Open("mysql", dsn)

	if err != nil {
		return err
	}

	conn.SetMaxOpenConns(20)
	conn.SetMaxIdleConns(5)
	conn.SetConnMaxIdleTime(30*time.Minute)

	if err := conn.Ping(); err != nil {
		return err
	}

	DB = conn

	return nil

}