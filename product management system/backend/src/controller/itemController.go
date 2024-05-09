package controller

import (
	//"go_gin_example/model"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"log"
)

type Item struct {
	Id         uuid.UUID `json:"id"`
	Order_id   uuid.UUID `json:"order_id"`
	Product_id uuid.UUID `json:"product_id"`
	Is_shipped string    `json:"is_shipped"`
}

func GetItems(c *gin.Context) {

	db := connectDB()

	var items []*Item

	db.Find(&items)

	closeDB(db)
	c.IndentedJSON(200, items)

}

func GetItemById(c *gin.Context) {
	db := connectDB()
	var item *Item
	db.Where("id = $1", c.Param("ItemId")).Take(&item)

	closeDB(db)
	c.JSON(200, item)
}

func GetItemsByOrderId(c *gin.Context) {
	db := connectDB()
	var items []*Item
	db.Preload("Order").Where("order_id = $1", c.Param("OrderId")).Find(&items)
	closeDB(db)
	c.IndentedJSON(200, items)
}

func UpdateItemById(c *gin.Context) {
	db := connectDB()
	var item *Item

	queryResult := db.Where("id = $1", c.Param("ItemId")).Take(&item)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "Update item failed with error: " + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}
	var itemBody *Item

	c.BindJSON(&itemBody)
	itemBody.Id = item.Id
	result := db.Model(&item).Where("id = ?", item.Id).Updates(&itemBody)

	if result.Error != nil {
		log.Println(result.Error)

		c.JSON(500, gin.H{
			"message": "Update item failed with error: " + result.Error.Error(),
		})

		closeDB(db)
		return
	}

	closeDB(db)
	c.JSON(200, gin.H{
		"message": "Update items Susseccfully",
	})
}