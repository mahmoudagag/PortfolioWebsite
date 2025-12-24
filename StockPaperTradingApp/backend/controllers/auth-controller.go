package controllers

import (
	"net/http"
	"os"

	"StockPaperTradingApp/db"
	"StockPaperTradingApp/models"

	"github.com/gin-gonic/gin"
)

type UserController interface {
	Register(ctx *gin.Context) (int, gin.H)
	Login(ctx *gin.Context) (int, gin.H)
	LoginWithAuth(ctx *gin.Context) (int, gin.H)
	Logout(ctx *gin.Context) (int, gin.H)
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

func setAuthCookie(ctx *gin.Context, token string) {
	secure := isProduction()

	http.SetCookie(ctx.Writer, &http.Cookie{
		Name:     "StockpapertradingToken",
		Value:    token,
		Path:     "/",
		MaxAge:   60 * 60 * 24, // 1 day
		HttpOnly: true,
		Secure:   secure,
		SameSite: http.SameSiteLaxMode,
	})
}

func isProduction() bool {
	isProd := os.Getenv("JWT_ENCRYPTION_KEY")
	return isProd != ""
}

func (c *authController) Register(ctx *gin.Context) (int, gin.H) {
	var user models.User
	if err := ctx.BindJSON(&user); err != nil {
		return http.StatusBadRequest, gin.H{"message": "Invalid request"}
	}

	if user.UserName == "" || user.Email == "" || user.Password == "" {
		return http.StatusBadRequest, gin.H{"message": "All fields must be filled"}
	}

	var existingUser models.User
	if err := db.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		return http.StatusConflict, gin.H{"message": "Email already exists"}
	}

	user.HashPassword()
	user.Cash = 50000

	if err := db.DB.Create(&user).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Error saving user"}
	}

	token, err := user.CreateJWT()
	if err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Error creating JWT"}
	}

	setAuthCookie(ctx, token)
	return http.StatusCreated, gin.H{
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

	var user models.User
	if err := db.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		return http.StatusUnauthorized, gin.H{"message": "Incorrect credentials"}
	}

	if !user.ComparePasswords(req.Password) {
		return http.StatusUnauthorized, gin.H{"message": "Incorrect credentials"}
	}

	token, err := user.CreateJWT()
	if err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Error creating JWT"}
	}

	setAuthCookie(ctx, token)

	return http.StatusOK, gin.H{
		"user": gin.H{
			"username": user.UserName,
			"email":    user.Email,
			"cash":     user.Cash,
		},
	}
}

func (c *authController) LoginWithAuth(ctx *gin.Context) (int, gin.H) {
	userIDVal, exists := ctx.Get("user_id")
	if !exists {
		return http.StatusUnauthorized, gin.H{"message": "Unauthorized"}
	}

	userID := userIDVal.(uint)

	var user models.User
	if err := db.DB.First(&user, userID).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "User not found"}
	}

	return http.StatusOK, gin.H{
		"user": gin.H{
			"username": user.UserName,
			"email":    user.Email,
			"cash":     user.Cash,
		},
	}
}

func (c *authController) Logout(ctx *gin.Context) (int, gin.H) {
	ctx.SetCookie("StockpapertradingToken", "", -1, "/", "", isProduction(), true)
	return http.StatusOK, gin.H{"message": "logged out"}
}
