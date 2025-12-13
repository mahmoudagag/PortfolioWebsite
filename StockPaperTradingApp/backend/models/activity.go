package models

import (
	"time"
)

type Activity struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Symbol      string    `gorm:"size:10;not null" json:"symbol"`
	CompanyName string    `gorm:"size:100" json:"companyName"`
	Quantity    int       `gorm:"not null" json:"quantity"`
	Side        string    `gorm:"size:4;not null" json:"side"` // e.g., "BUY" or "SELL"
	Price       float64   `gorm:"not null" json:"price"`
	InitiatedOn time.Time `gorm:"not null" json:"initiated_on"`
	UserID      uint      `gorm:"not null" json:"user_id"` // foreign key to User table
}

func (a *Activity) TotalValue() float64 {
	return float64(a.Quantity) * a.Price
}
