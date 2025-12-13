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
	tokenString := ctx.Request.Header.Get("token")
	secret := os.Getenv("JWT_ENCRYPTION_KEY")
	if secret == "" {
		secret = "FkdcFb5Dsa"
	}
	token, err := jwt.ParseWithClaims(tokenString, jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "failed to validate token"})
		ctx.Abort()
		return
	}
	claims, ok := token.Claims.(jwt.MapClaims)

	if ok && token.Valid {
		// check if the token expires or not
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "token has expired"})
			ctx.Abort()
			return
		}
	} else {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "something went wrong with token claims"})
		ctx.Abort()
		return
	}
	idFloat, _ := claims["user_id"].(float64)
	ctx.Set("user_id", uint(idFloat))

	ctx.Next()
}
