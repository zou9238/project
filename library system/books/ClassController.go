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

func GetClassByID(c *gin.Context) {
	db := connectDB()
	var class *Class
	queryResult := db.Where("id = $1", c.Param("id")).Take(&class)
	if queryResult.Error != nil {
		c.JSON(500, gin.H{
			"message": "查無此類別" + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, class)
}

func CreateClass(c *gin.Context) {
	db := connectDB()
	var class *Class
	c.BindJSON(&class)
	result := db.Create(&class)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": "新增失敗" + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, class)
}

func UpdateClass(c *gin.Context) {
	db := connectDB()
	var class *Class

	queryResult := db.Where("id = $1", c.Param("id")).Take(&class)
	if queryResult.Error != nil {
		c.JSON(500, gin.H{
			"message": "查無此類別" + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}
	var classbody *Class
	c.BindJSON(&classbody)
	classbody.Id = class.Id

	result := db.Model(&class).Where("id = ?", class.Id).Updates(&classbody)

	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": "更新失敗" + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, class)
}	

func DeleteClass(c *gin.Context) {
	db := connectDB()
	var class *Class

	queryResult := db.Where("id = $1", c.Param("id")).Take(&class)
	if queryResult.Error != nil {
		c.JSON(500, gin.H{
			"message": "查無此類別" + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}

	result := db.Delete(&class)

	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": "刪除失敗" + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, class)
}


