package controller

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Author struct {
	Id   uuid.UUID `gorm:"primaryKey" json:"id"`
	Name string    `json:"name"`
}

func GetAuthors(c *gin.Context) {
	db := connectDB()
	var authors *[]Author
	db.Find(&authors)
	closeDB(db)
	c.JSON(200, authors)
}

func CreateAuthor(c *gin.Context) {
	db := connectDB()
	var author *Author
	c.Bind(&author)
	result := db.Create(&author)
	if result.Error != nil {
		log.Println(result.Error)
		c.JSON(500, gin.H{
			"message": "新增失敗" + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, author)
}
