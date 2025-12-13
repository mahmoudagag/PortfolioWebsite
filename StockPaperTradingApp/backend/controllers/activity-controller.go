package controllers

import (
	"StockPaperTradingApp/db"
	"StockPaperTradingApp/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ActivityController interface {
	CreateActivity(ctx *gin.Context) (int, gin.H)
	GetAllActivity(ctx *gin.Context) (int, gin.H)
	GetActivity(ctx *gin.Context) (int, gin.H)
}

type activityController struct{}

func Activity() ActivityController {
	return &activityController{}
}

func (c *activityController) CreateActivity(ctx *gin.Context) (int, gin.H) {
	var activity models.Activity
	if err := ctx.BindJSON(&activity); err != nil {
		return http.StatusBadRequest, gin.H{"message": "Invalid JSON", "error": err.Error()}
	}

	if activity.CompanyName == "" || activity.Quantity == 0 || activity.Symbol == "" || activity.Side == "" || activity.Price == 0 {
		return http.StatusBadRequest, gin.H{"message": "All fields must be filled"}
	}

	if activity.Side != "BUY" && activity.Side != "SELL" {
		return http.StatusBadRequest, gin.H{"message": "Side must be either BUY or SELL"}
	}

	userIDVal, ok := ctx.Get("user_id")
	if !ok {
		return http.StatusBadRequest, gin.H{"message": "Must have auth token"}
	}

	// Assuming your UserID is uint (GORM default primary key type)
	userID, err := strconv.ParseUint(userIDVal.(string), 10, 64)
	if err != nil {
		return http.StatusBadRequest, gin.H{"message": "Invalid user ID"}
	}
	activity.UserID = uint(userID)

	if err := db.DB.Create(&activity).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Failed to insert activity", "error": err.Error()}
	}

	return http.StatusCreated, gin.H{"activity": activity}
}

func (c *activityController) GetAllActivity(ctx *gin.Context) (int, gin.H) {
	userIDVal, ok := ctx.Get("user_id")
	if !ok {
		return http.StatusBadRequest, gin.H{"message": "Must have auth token"}
	}

	userID, err := strconv.ParseUint(userIDVal.(string), 10, 64)
	if err != nil {
		return http.StatusBadRequest, gin.H{"message": "Invalid user ID"}
	}

	var activities []models.Activity
	if err := db.DB.Where("user_id = ?", uint(userID)).Order("initiated_on DESC").Find(&activities).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Failed to fetch activities", "error": err.Error()}
	}

	return http.StatusOK, gin.H{"activity": activities}
}

func (c *activityController) GetActivity(ctx *gin.Context) (int, gin.H) {
	activityIDParam := ctx.Param("id")
	activityID, err := strconv.ParseUint(activityIDParam, 10, 64)
	if err != nil {
		return http.StatusBadRequest, gin.H{"message": "Invalid activity ID"}
	}

	var activity models.Activity
	if err := db.DB.First(&activity, activityID).Error; err != nil {
		return http.StatusNotFound, gin.H{"message": "Activity not found", "error": err.Error()}
	}

	return http.StatusOK, gin.H{"activity": activity}
}
