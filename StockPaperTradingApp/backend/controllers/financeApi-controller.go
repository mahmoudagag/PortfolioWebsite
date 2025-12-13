package controllers

import (
	"net/http"
	"net/url"
	"strings"

	"StockPaperTradingApp/db"
	"StockPaperTradingApp/models"

	"github.com/gin-gonic/gin"
)

// FinanceController defines all finance-related endpoints
type FinanceController interface {
	GetAutoComplete(ctx *gin.Context) (int, gin.H)
	GetTrending(ctx *gin.Context) (int, gin.H)
	GetStockPageInformation(ctx *gin.Context) (int, gin.H)
	GetDashboardInformation(ctx *gin.Context) (int, gin.H)
	GetStockInformation(ctx *gin.Context) (int, gin.H)
}

// Controller struct
type financeController struct {
	helper HelperController
}

// Constructor
func FinanceApi() FinanceController {
	return &financeController{
		helper: Helper(),
	}
}

var baseURL = "https://yfapi.net"

// --- Handlers ---

func (c *financeController) GetAutoComplete(ctx *gin.Context) (int, gin.H) {
	query := ctx.Query("query")
	if query == "" {
		return http.StatusBadRequest, gin.H{"error": "Query parameter is required"}
	}

	url := baseURL + "/v6/finance/autocomplete?region=US&lang=en&query=" + query
	res := c.helper.SendRequest(url)
	return http.StatusOK, res
}

func (c *financeController) GetTrending(ctx *gin.Context) (int, gin.H) {
	url := baseURL + "/v1/finance/trending/US"
	res := c.helper.SendRequest(url)

	quotes := res["finance"].(map[string]any)["result"].([]any)[0].(map[string]any)["quotes"].([]any)

	var symbols []string
	for _, q := range quotes {
		symbols = append(symbols, q.(map[string]any)["symbol"].(string))
	}

	results := c.helper.GetStockInformation(symbols)
	return http.StatusOK, gin.H{"res": results}
}

func (c *financeController) GetDashboardInformation(ctx *gin.Context) (int, gin.H) {
	userIDInterface, exists := ctx.Get("userID")
	if !exists {
		return http.StatusUnauthorized, gin.H{"error": "User not authenticated"}
	}
	userID := userIDInterface.(uint)

	// 1. Get networth from Postgres
	var netWorthList []models.Networth
	db.DB.Where("user_id = ?", userID).Order("initiated_on DESC").Find(&netWorthList)

	// 2. Get holdings
	var holdings []models.Holdings
	db.DB.Where("user_id = ?", userID).Find(&holdings)

	symbolToQuantity := make(map[string]int)
	var symbols []string
	for _, h := range holdings {
		symbolToQuantity[h.Symbol] = h.Quantity
		symbols = append(symbols, h.Symbol)
	}

	// 3. Fetch stock prices
	symbolsInfo := c.helper.GetStockInformation(symbols)
	symbolToWorth := make(map[string]float64)
	var assetsWorth float64
	for _, info := range symbolsInfo {
		data := info.(map[string]any)
		symbol := data["symbol"].(string)
		price := data["regularMarketPrice"].(float64)
		quantity := symbolToQuantity[symbol]
		assetWorth := price * float64(quantity)
		symbolToWorth[symbol] = assetWorth
		assetsWorth += assetWorth
	}

	// 4. Sector allocation
	sectorToPercentage := make(map[string]float64)
	for _, symbol := range symbols {
		url := baseURL + "/v11/finance/quoteSummary/" + symbol + "?lang=en&region=US&modules=assetProfile"
		result := c.helper.SendRequest(url)
		sector := result["quoteSummary"].(map[string]any)["result"].([]any)[0].(map[string]any)["assetProfile"].(map[string]any)["sector"].(string)
		sectorToPercentage[sector] += (symbolToWorth[symbol] / assetsWorth) * 100
	}

	// 5. S&P performance
	snpURL := baseURL + "/v8/finance/spark?interval=1d&range=3mo&" + url.PathEscape("symbols=^GSPC")
	snpRes := c.helper.SendRequest(snpURL)

	return http.StatusOK, gin.H{
		"assetsWorth":    assetsWorth,
		"diversityGraph": sectorToPercentage,
		"performaceGraph": gin.H{
			"timeStamp":    snpRes["^GSPC"].(map[string]any)["timestamp"],
			"snpPrice":     snpRes["^GSPC"].(map[string]any)["close"],
			"netWorthList": netWorthList,
		},
	}
}

func (c *financeController) GetStockPageInformation(ctx *gin.Context) (int, gin.H) {
	stocksQuery := ctx.Query("stock")
	if stocksQuery == "" {
		return http.StatusBadRequest, gin.H{"error": "stock query parameter required"}
	}

	stocks := strings.Split(stocksQuery, ",")
	stockInfo := c.helper.GetStockInformation(stocks)

	companyURL := baseURL + "/v11/finance/quoteSummary/" + stocksQuery + "?lang=en&region=US&modules=assetProfile"
	companyInfo := c.helper.SendRequest(companyURL)

	ranges := [8]string{"1d", "5d", "1mo", "6mo", "ytd", "1y", "5y", "max"}
	intervals := [8]string{"5m", "15m", "1d", "1d", "1d", "1d", "1wk", "1wk"}
	chartIntervals := make(map[string]any)
	for i := 0; i < 8; i++ {
		chartURL := baseURL + "/v8/finance/chart/" + stocksQuery + "?range=" + ranges[i] + "&region=US&interval=" + intervals[i] + "&lang=en&events=div%2Csplit"
		chartIntervals[ranges[i]] = c.helper.SendRequest(chartURL)
	}

	return http.StatusOK, gin.H{
		"stockInformation":   stockInfo,
		"companyInformation": companyInfo,
		"chartIntervals":     chartIntervals,
	}
}

func (c *financeController) GetStockInformation(ctx *gin.Context) (int, gin.H) {
	stocksQuery := ctx.Query("stocks")
	if stocksQuery == "" {
		return http.StatusBadRequest, gin.H{"error": "stocks query parameter required"}
	}

	stocks := strings.Split(stocksQuery, ",")
	results := c.helper.GetStockInformation(stocks)

	return http.StatusOK, gin.H{"res": results}
}
