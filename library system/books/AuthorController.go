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

func GetAuthorById(c *gin.Context) {
	db := connectDB()
	var author *Author
	queryResult := db.Where("id = $1", c.Param("id")).Take(&author)
	if queryResult.Error != nil {
		c.JSON(500, gin.H{
			"message": "查無此人" + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, author)
}

func CreateAuthor(c *gin.Context) {
	db := connectDB()
	var author *Author
	c.BindJSON(&author)
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

func UpdateAuthor(c *gin.Context) {
	db := connectDB()
	var author *Author

	queryResult := db.Where("id = $1", c.Param("id")).Take(&author)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "查無此人" + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}
	var authorbody *Author
	c.BindJSON(&authorbody)
	authorbody.Id = author.Id

	result := db.Model(&author).Where("id = ?", author.Id).Updates(&authorbody)

	if result.Error != nil {
		log.Println(result.Error)
		c.JSON(500, gin.H{
			"message": "更新失敗" + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, author)
}

func DeleteAuthor(c *gin.Context) {
	db := connectDB()
	var author *Author

	queryResult := db.Where("id = $1", c.Param("id")).Take(&author)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "查無此人" + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}

	result := db.Delete(&author)

	if result.Error != nil {
		log.Println(result.Error)
		c.JSON(500, gin.H{
			"message": "刪除失敗" + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, author)
}

