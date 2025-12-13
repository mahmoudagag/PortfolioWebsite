package controllers

import (
	"net/http"

	"StockPaperTradingApp/db"
	"StockPaperTradingApp/models"

	"github.com/gin-gonic/gin"
)

type UserController interface {
	Register(ctx *gin.Context) (int, gin.H)
	Login(ctx *gin.Context) (int, gin.H)
	LoginWithAuth(ctx *gin.Context) (int, gin.H)
}

// variables
type authController struct{}

// constructor
func Auth() UserController {
	return &authController{}
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (c *authController) Register(ctx *gin.Context) (int, gin.H) {
	var user models.User
	if err := ctx.BindJSON(&user); err != nil {
		return http.StatusBadRequest, gin.H{"message": "Invalid request"}
	}
	if user.UserName == "" || user.Email == "" || user.Password == "" {
		return http.StatusBadRequest, gin.H{"message": "All fields must be filled"}
	}

	// Check if email already exists
	var existingUser models.User
	if err := db.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		return http.StatusConflict, gin.H{"message": "Email already exists"}
	}

	// Hash password and set default cash
	user.HashPassword()
	user.Cash = 50000

	if err := db.DB.Create(&user).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Error saving user", "error": err.Error()}
	}

	// Generate JWT token
	token, err := user.CreateJWT()
	if err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Error creating JWT token", "error": err.Error()}
	}

	return http.StatusCreated, gin.H{
		"token": token,
		"user": gin.H{
			"username": user.UserName,
			"email":    user.Email,
			"cash":     user.Cash,
		},
	}
}

func (c *authController) Login(ctx *gin.Context) (int, gin.H) {
	var req LoginRequest
	if err := ctx.BindJSON(&req); err != nil {
		return http.StatusBadRequest, gin.H{"message": "Invalid request"}
	}

	if req.Email == "" || req.Password == "" {
		return http.StatusBadRequest, gin.H{"message": "All fields must be filled"}
	}

	var resultUser models.User
	if err := db.DB.Where("email = ?", req.Email).First(&resultUser).Error; err != nil {
		return http.StatusUnauthorized, gin.H{"message": "Incorrect credentials"}
	}

	if !resultUser.ComparePasswords(req.Password) {
		return http.StatusUnauthorized, gin.H{"message": "Incorrect credentials"}
	}

	token, err := resultUser.CreateJWT()
	if err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Error creating JWT token", "error": err.Error()}
	}

	return http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"username": resultUser.UserName,
			"email":    resultUser.Email,
			"cash":     resultUser.Cash,
		},
	}
}

func (c *authController) LoginWithAuth(ctx *gin.Context) (int, gin.H) {
	userIDVal, exists := ctx.Get("userID")
	if !exists {
		return http.StatusUnauthorized, gin.H{"message": "No user ID found in context"}
	}

	userID, ok := userIDVal.(uint)
	if !ok {
		return http.StatusInternalServerError, gin.H{"message": "Invalid user ID type"}
	}

	var user models.User
	if err := db.DB.First(&user, userID).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "User not found", "error": err.Error()}
	}

	token, _ := user.CreateJWT()
	return http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"username": user.UserName,
			"email":    user.Email,
			"cash":     user.Cash,
		},
	}
}
