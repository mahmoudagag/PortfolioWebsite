package controllers

import (
	"StockPaperTradingApp/db"
	"StockPaperTradingApp/models"
	"net/http"
	"net/url"
	"time"

	"github.com/gin-gonic/gin"
)

type ApiController interface {
	BuyStock(ctx *gin.Context) (int, gin.H)
	SellStock(ctx *gin.Context) (int, gin.H)
	GetAllData(ctx *gin.Context) (int, gin.H)
}

type apiController struct {
	helper HelperController
}

func Api() ApiController {
	return &apiController{
		helper: Helper(),
	}
}

type RequestBody struct {
	Quantity int    `json:"quantity"`
	Symbol   string `json:"symbol"`
}

func (c *apiController) BuyStock(ctx *gin.Context) (int, gin.H) {
	userIDValue, _ := ctx.Get("user_id")
	userID := userIDValue.(uint)

	var req RequestBody
	if err := ctx.BindJSON(&req); err != nil || req.Quantity <= 0 {
		return http.StatusBadRequest, gin.H{"message": "Must provide valid quantity and symbol"}
	}

	// get stock info from helper
	url := "https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=" + req.Symbol
	stockInfo := c.helper.SendRequest(url)
	results := stockInfo["quoteResponse"].(map[string]any)["result"].([]any)
	if len(results) == 0 {
		return http.StatusBadRequest, gin.H{"message": "Stock does not exist"}
	}

	price := results[0].(map[string]any)["regularMarketPrice"].(float64)
	companyName := results[0].(map[string]any)["longName"].(string)

	// get user
	var user models.User
	if err := db.DB.First(&user, userID).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "User not found"}
	}

	// check cash
	totalCost := price * float64(req.Quantity)
	if user.Cash < totalCost {
		return http.StatusBadRequest, gin.H{"message": "Not enough cash"}
	}

	user.Cash -= totalCost
	db.DB.Save(&user)

	// create activity
	activity := models.Activity{
		Symbol:      req.Symbol,
		CompanyName: companyName,
		Quantity:    req.Quantity,
		Side:        "BUY",
		Price:       price,
		InitiatedOn: time.Now().UTC(),
		UserID:      user.ID,
	}
	db.DB.Create(&activity)

	// update holdings
	var holding models.Holdings
	err := db.DB.Where("user_id = ? AND symbol = ?", userID, req.Symbol).First(&holding).Error
	if err == nil {
		holding.Quantity += req.Quantity
		db.DB.Save(&holding)
	} else {
		newHolding := models.Holdings{
			Symbol:      req.Symbol,
			CompanyName: companyName,
			Quantity:    req.Quantity,
			UserID:      user.ID,
		}
		db.DB.Create(&newHolding)
	}

	return http.StatusOK, gin.H{"message": "Successfully bought stock"}
}

func (c *apiController) SellStock(ctx *gin.Context) (int, gin.H) {
	userIDValue, _ := ctx.Get("user_id")
	userID := userIDValue.(uint)

	var req RequestBody
	if err := ctx.BindJSON(&req); err != nil || req.Quantity <= 0 {
		return http.StatusBadRequest, gin.H{"message": "Must provide valid quantity and symbol"}
	}

	// get holdings
	var holding models.Holdings
	if err := db.DB.Where("user_id = ? AND symbol = ?", userID, req.Symbol).First(&holding).Error; err != nil {
		return http.StatusBadRequest, gin.H{"message": "User does not own this stock"}
	}

	if holding.Quantity < req.Quantity {
		return http.StatusBadRequest, gin.H{"message": "Not enough stock to sell"}
	}

	// get stock price
	url := "https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=" + req.Symbol
	stockInfo := c.helper.SendRequest(url)
	results := stockInfo["quoteResponse"].(map[string]any)["result"].([]any)
	if len(results) == 0 {
		return http.StatusBadRequest, gin.H{"message": "Stock does not exist"}
	}
	price := results[0].(map[string]any)["regularMarketPrice"].(float64)
	companyName := results[0].(map[string]any)["longName"].(string)

	// update holdings
	if holding.Quantity == req.Quantity {
		db.DB.Delete(&holding)
	} else {
		holding.Quantity -= req.Quantity
		db.DB.Save(&holding)
	}

	// update user cash
	var user models.User
	db.DB.First(&user, userID)
	user.Cash += price * float64(req.Quantity)
	db.DB.Save(&user)

	// create activity
	activity := models.Activity{
		Symbol:      req.Symbol,
		CompanyName: companyName,
		Quantity:    req.Quantity,
		Side:        "SELL",
		Price:       price,
		InitiatedOn: time.Now().UTC(),
		UserID:      user.ID,
	}
	db.DB.Create(&activity)

	return http.StatusOK, gin.H{"message": "Successfully sold stock"}
}

func (c *apiController) GetAllData(ctx *gin.Context) (int, gin.H) {
	userId, exists := ctx.Get("user_id")
	if !exists {
		return http.StatusUnauthorized, gin.H{"message": "Missing user id"}
	}

	var (
		user       models.User
		holdings   []models.Holdings
		activities []models.Activity
		networth   []models.Networth
	)

	// Get user
	if err := db.DB.First(&user, "id = ?", userId).Error; err != nil {
		return http.StatusNotFound, gin.H{"message": "User not found"}
	}

	// Get holdings
	if err := db.DB.Where("user_id = ?", userId).Find(&holdings).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Failed to retrieve holdings"}
	}

	// Get activities
	if err := db.DB.Where("user_id = ?", userId).Find(&activities).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Failed to retrieve activities"}
	}

	// Get net worth history (sorted)
	if err := db.DB.
		Where("user_id = ?", userId).
		Order("created_at DESC").
		Find(&networth).Error; err != nil {
		return http.StatusInternalServerError, gin.H{"message": "Failed to retrieve networth"}
	}

	// Extract networth list
	var networthList []float64
	for _, n := range networth {
		networthList = append(networthList, n.Networth)
	}

	// Trending
	trendingUrl := baseURL + "/v1/finance/trending/US"
	trendingRaw := c.helper.SendRequest(trendingUrl)

	listOfTrending := trendingRaw["finance"].(map[string]any)["result"].([]any)[0].(map[string]any)["quotes"].([]any)

	var trendingSymbols []string
	for _, s := range listOfTrending {
		trendingSymbols = append(trendingSymbols, s.(map[string]any)["symbol"].(string))
	}
	trendingResults := c.helper.GetStockInformation(trendingSymbols)

	// S&P 500 sparkline
	snpUrl := baseURL +
		"/v8/finance/spark?interval=1d&range=3mo&" +
		url.PathEscape("symbols=^GSPC")

	snpData := c.helper.SendRequest(snpUrl)

	// Convert holdings into map[symbol]quantity
	symbolToQuantity := map[string]int{}
	var symbols []string
	for _, h := range holdings {
		symbolToQuantity[h.Symbol] = h.Quantity
		symbols = append(symbols, h.Symbol)
	}

	// Fetch market data
	symbolInfoList := c.helper.GetStockInformation(symbols)

	symbolToWorth := map[string]float64{}
	totalAssetWorth := 0.0

	for _, info := range symbolInfoList {
		item := info.(map[string]any)
		symbol := item["symbol"].(string)
		price := item["regularMarketPrice"].(float64)
		quantity := symbolToQuantity[symbol]

		worth := price * float64(quantity)
		symbolToWorth[symbol] = worth
		totalAssetWorth += worth
	}

	// Sector diversity
	sectorTotals := map[string]float64{}
	for _, symbol := range symbols {
		raw := c.helper.SendRequest(
			baseURL + "/v11/finance/quoteSummary/" + symbol +
				"?lang=en&region=US&modules=assetProfile",
		)

		sector := raw["quoteSummary"].(map[string]any)["result"].([]any)[0].(map[string]any)["assetProfile"].(map[string]any)["sector"].(string)

		sectorTotals[sector] += symbolToWorth[symbol]
	}

	return http.StatusOK, gin.H{
		"user":       user,
		"holdings":   holdings,
		"activities": activities,
		"trending":   trendingResults,
		"dashboard": gin.H{
			"assetsWorth":    totalAssetWorth,
			"diversityGraph": sectorTotals,
			"performaceGraph": gin.H{
				"timeStamp":    snpData["^GSPC"].(map[string]any)["timestamp"],
				"snpPrice":     snpData["^GSPC"].(map[string]any)["close"],
				"netWorthList": networthList,
			},
		},
	}
}
