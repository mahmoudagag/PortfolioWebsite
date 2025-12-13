package models

import "time"

type Networth struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Networth  float64   `gorm:"not null" json:"networth"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"initiated_on"`
	UserID    uint      `gorm:"not null" json:"user_id"` // foreign key to User
}
