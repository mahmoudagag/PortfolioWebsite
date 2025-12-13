package models

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID       uint    `gorm:"primaryKey" json:"id"`
	UserName string  `gorm:"size:50;not null" json:"username"`
	Email    string  `gorm:"size:100;unique;not null" json:"email"`
	Password string  `gorm:"size:255;not null" json:"password"`
	Cash     float64 `gorm:"default:0" json:"cash"`
}

// HashPassword hashes the user's password
func (u *User) HashPassword() error {
	hashed, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashed)
	return nil
}

// ComparePasswords compares a plaintext password with the hashed one
func (u *User) ComparePasswords(candidatePassword string) bool {
	hashed, _ := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(candidatePassword))
	return err == nil
}

// CreateJWT generates a JWT token for the user
func (u *User) CreateJWT() (string, error) {
	encryptionKey := os.Getenv("JWT_ENCRYPTION_KEY")
	if encryptionKey == "" {
		encryptionKey = "FkdcFb5Dsa"
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": u.ID,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	})
	tokenString, err := token.SignedString([]byte(encryptionKey))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// Optional: before saving a user, hash the password automatically
// func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
// 	return u.HashPassword()
// }
