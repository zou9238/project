package controller

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type User struct {
	Id           uuid.UUID `gorm:"primaryKey" json:"id"`
	Name         string    `json:"name"`
	Phone_number string    `json:"phone_number"`
	Email        string    `json:"email"`
}

func GetUsers(c *gin.Context) {
	db := connectDB()
	var users *[]User
	db.Find(&users)
	closeDB(db)
	c.JSON(200, users)
}

func CreateUser(c *gin.Context) {
	db := connectDB()
	var user *User
	c.Bind(&user)
	result := db.Create(&user)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": "新增失敗" + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, user)
}

func UpdateUser(c *gin.Context) {
	db := connectDB()
	var user *User

	queryResult := db.Where("id = $1", c.Param("id")).Take(&user)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "查無此人" + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}
	var userbody *User
	c.BindJSON(&userbody)
	userbody.Id = user.Id

	result := db.Model(&user).Where("id = ?", user.Id).Updates(&userbody)

	if result.Error != nil {
		log.Println(result.Error)
		c.JSON(500, gin.H{
			"message": "修改失敗" + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, gin.H{
		"message": "修改成功",
	})
}
