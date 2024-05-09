package controller

import (
	//"go_gin_example/model"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Category struct {
	Id   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

func GetCategories(c *gin.Context) {

	db := connectDB()

	var categories []*Category

	db.Find(&categories)

	closeDB(db)
	c.IndentedJSON(200, categories)

}

func GetCategoryById(c *gin.Context) {
	db := connectDB()
	var category *Category
	db.Where("id = $1", c.Param("CategoryId")).Take(&category)

	closeDB(db)
	c.JSON(200, category)
}