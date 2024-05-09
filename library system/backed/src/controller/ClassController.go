package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Class struct {
	Id   uuid.UUID `gorm:"primaryKey" json:"id"`
	Name string    `json:"name"`
}

func GetClasses(c *gin.Context) {
	db := connectDB()
	var classes *[]Class
	db.Find(&classes)
	closeDB(db)
	c.JSON(200, classes)
}
