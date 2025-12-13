package controllers

import (
	"StockPaperTradingApp/db"
	"StockPaperTradingApp/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type HoldingsController interface {
	CreateHoldings(ctx *gin.Context) (int, gin.H)
	GetAllHoldings(ctx *gin.Context) (int, gin.H)
	GetHoldings(ctx *gin.Context) (int, gin.H)
	UpdateQuantityHoldings(ctx *gin.Context) (int, gin.H)
	DeleteHoldings(ctx *gin.Context) (int, gin.H)
}

type holdingsController struct{}

func Holdings() HoldingsController {
	return &holdingsController{}
}

func (c *holdingsController) CreateHoldings(ctx *gin.Context) (int, gin.H) {
	var holdings models.Holdings
	if err := ctx.BindJSON(&holdings); err != nil {
		return http.StatusBadRequest, gin.H{"message": "Invalid request body"}
	}
	if holdings.CompanyName == "" || holdings.Quantity == 0 || holdings.Symbol == "" {
		return http.StatusBadRequest, gin.H{"message": "All fields must be filled"}
	}

	userIDValue, exists := ctx.Get("user_id")
	if !exists {
		return http.StatusBadRequest, gin.H{"message": "Must have auth token"}
	}

	// userID is assumed to be uint in JWT claims
	userID, ok := userIDValue.(uint)
	if !ok {
		return http.StatusBadRequest, gin.H{"message": "Invalid user_id"}
	}
	holdings.UserID = userID

	if err := db.DB.Create(&holdings).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Failed to create holdings", "error": err.Error()}
	}

	return http.StatusCreated, gin.H{"holdings": holdings}
}

func (c *holdingsController) GetAllHoldings(ctx *gin.Context) (int, gin.H) {
	userIDValue, exists := ctx.Get("user_id")
	if !exists {
		return http.StatusBadRequest, gin.H{"message": "Must have auth token"}
	}
	userID, ok := userIDValue.(uint)
	if !ok {
		return http.StatusBadRequest, gin.H{"message": "Invalid user_id"}
	}

	var holdings []models.Holdings
	if err := db.DB.Where("user_id = ?", userID).Find(&holdings).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Failed to get holdings", "error": err.Error()}
	}

	return http.StatusOK, gin.H{"holdings": holdings}
}

func (c *holdingsController) GetHoldings(ctx *gin.Context) (int, gin.H) {
	idParam := ctx.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return http.StatusBadRequest, gin.H{"message": "Invalid holdings ID"}
	}

	var holding models.Holdings
	if err := db.DB.First(&holding, id).Error; err != nil {
		return http.StatusNotFound, gin.H{"message": "Holding not found", "error": err.Error()}
	}

	return http.StatusOK, gin.H{"holding": holding}
}

type QuantityRequestBody struct {
	Quantity int `json:"quantity"`
}

func (c *holdingsController) UpdateQuantityHoldings(ctx *gin.Context) (int, gin.H) {
	idParam := ctx.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return http.StatusBadRequest, gin.H{"message": "Invalid holdings ID"}
	}

	var reqBody QuantityRequestBody
	if err := ctx.BindJSON(&reqBody); err != nil || reqBody.Quantity <= 0 {
		return http.StatusBadRequest, gin.H{"message": "Must provide a valid quantity"}
	}

	var holding models.Holdings
	if err := db.DB.First(&holding, id).Error; err != nil {
		return http.StatusNotFound, gin.H{"message": "Holding not found", "error": err.Error()}
	}

	holding.Quantity = reqBody.Quantity
	if err := db.DB.Save(&holding).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Failed to update holding", "error": err.Error()}
	}

	return http.StatusOK, gin.H{"updatedHolding": holding}
}

func (c *holdingsController) DeleteHoldings(ctx *gin.Context) (int, gin.H) {
	idParam := ctx.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return http.StatusBadRequest, gin.H{"message": "Invalid holdings ID"}
	}

	if err := db.DB.Delete(&models.Holdings{}, id).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Failed to delete holding", "error": err.Error()}
	}

	return http.StatusOK, gin.H{"message": "Deleted successfully"}
}
