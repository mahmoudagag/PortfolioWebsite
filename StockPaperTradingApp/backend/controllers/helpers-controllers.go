package controllers

import (
	"encoding/json"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"StockPaperTradingApp/db"
	"StockPaperTradingApp/models"
)

type HelperController interface {
	SendRequest(rawUrl string) map[string]any
	GetStockInformation(symbols []string) []any
	GetHoldings(userID uint) []models.Holdings
	UpdateNetworths()
}

// variables
type helperController struct{}

// constructor
func Helper() HelperController {
	return &helperController{}
}

func (c *helperController) SendRequest(rawUrl string) map[string]any {
	apiToken := os.Getenv("API_KEY")
	req, _ := http.NewRequest(http.MethodGet, rawUrl, nil)
	req.Header.Set("x-api-key", apiToken)
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

	client := &http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()

	var res map[string]any
	json.NewDecoder(resp.Body).Decode(&res)
	return res
}

func (c *helperController) GetStockInformation(symbols []string) []any {
	var queriesList [][]string
	var curr []string

	for _, sym := range symbols {
		curr = append(curr, sym)
		if len(curr) == 10 {
			queriesList = append(queriesList, curr)
			curr = []string{}
		}
	}
	if len(curr) > 0 {
		queriesList = append(queriesList, curr)
	}

	var results []any
	baseURL := "https://yfapi.net"
	rawURL := baseURL + "/v6/finance/quote?region=US&lang=en&symbols="

	for _, queryArray := range queriesList {
		query := strings.Join(queryArray, ",")
		encodedQuery := url.PathEscape(query)
		res := c.SendRequest(rawURL + encodedQuery)
		information := res["quoteResponse"].(map[string]any)["result"].([]any)
		results = append(results, information...)
	}

	return results
}

func (c *helperController) GetHoldings(userID uint) []models.Holdings {
	var holdings []models.Holdings
	db.DB.Where("user_id = ?", userID).Find(&holdings)
	return holdings
}

func (c *helperController) UpdateNetworths() {
	// Get all users
	var users []models.User
	db.DB.Find(&users)

	for _, user := range users {
		holdings := c.GetHoldings(user.ID)

		// calculate asset worth
		symbolToQuantity := make(map[string]int)
		var listOfSymbols []string
		for _, h := range holdings {
			symbolToQuantity[h.Symbol] = h.Quantity
			listOfSymbols = append(listOfSymbols, h.Symbol)
		}

		symbolsInformation := c.GetStockInformation(listOfSymbols)
		var assetsWorth float64 = 0
		for _, symbolInfo := range symbolsInformation {
			symbol := symbolInfo.(map[string]any)["symbol"].(string)
			price := symbolInfo.(map[string]any)["regularMarketPrice"].(float64)
			quantity := symbolToQuantity[symbol]
			assetsWorth += price * float64(quantity)
		}

		// save networth
		networth := models.Networth{
			Networth:  user.Cash + assetsWorth,
			CreatedAt: time.Now().UTC(),
			UserID:    user.ID,
		}
		db.DB.Create(&networth)
	}
}
