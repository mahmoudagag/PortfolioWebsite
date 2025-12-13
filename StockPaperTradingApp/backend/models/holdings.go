package models

type Holdings struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Symbol      string `gorm:"size:10;not null" json:"symbol"`
	CompanyName string `gorm:"size:100" json:"companyName"`
	Quantity    int    `gorm:"not null" json:"quantity"`
	UserID      uint   `gorm:"not null" json:"user_id"` // foreign key to User
}
