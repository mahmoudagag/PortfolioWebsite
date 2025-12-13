package db

import (
	"fmt"
	"log"
	"os"

	"StockPaperTradingApp/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Use env variable if set, otherwise fallback to default
	// dsn = "host=localhost user=postgres password=yourpassword dbname=mydb port=5432 sslmode=disable"
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Println("DATABASE_URL not set, using default local database")
		dsn = "host=localhost user=mahmoudagag dbname=stocktrading port=5432 sslmode=disable"
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	DB = db
	fmt.Println("Connected to PostgreSQL!")
}

func MigrateTables() {
	err := DB.AutoMigrate(&models.User{}, &models.Holdings{}, &models.Activity{}, &models.Networth{})
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
}
