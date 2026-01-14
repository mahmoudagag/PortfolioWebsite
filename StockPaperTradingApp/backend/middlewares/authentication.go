package middlewares

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

// https://medium.com/@smooth-55/json-web-token-jwt-authentication-in-golang-using-jwt-go-245fd18e14af

func Authentication(ctx *gin.Context) {
	tokenString, err := ctx.Cookie("StockpapertradingToken")
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "authentication required"})
		ctx.Abort()
		return
	}

	secret := os.Getenv("JWT_ENCRYPTION_KEY")

	token, err := jwt.ParseWithClaims(tokenString, jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil || !token.Valid {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
		ctx.Abort()
		return
	}

	claims := token.Claims.(jwt.MapClaims)

	if float64(time.Now().Unix()) > claims["exp"].(float64) {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "token expired"})
		ctx.Abort()
		return
	}

	userID := uint(claims["user_id"].(float64))
	ctx.Set("user_id", userID)

	ctx.Next()
}
