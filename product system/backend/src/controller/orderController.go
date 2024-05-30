package controller

import (
	//"go_gin_example/model"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"log"
)

type Order struct {
	Id          uuid.UUID `json:"id"`
	Customer_id uuid.UUID `json:"customer_id"`
	Is_paid     string    `json:"is_paid"`
}

func GetOrders(c *gin.Context) {

	db := connectDB()

	var order []*Order

	db.Find(&order)

	closeDB(db)
	c.IndentedJSON(200, order)

}

func GetOrderById(c *gin.Context) {
	db := connectDB()
	var order *Order
	db.Where("id = $1", c.Param("OrderId")).Take(&order)

	closeDB(db)
	c.JSON(200, order)
}

func GetOrderByCustomerId(c *gin.Context) {
	db := connectDB()
	var orders []*Order
	db.Preload("Customer").Where("customer_id = $1", c.Param("CustomerId")).Find(&orders)

	closeDB(db)
	c.IndentedJSON(200, orders)
}

func CreateOrders(c *gin.Context) {
	db := connectDB()
	var order Order
	c.BindJSON(&order)

	result := db.Create(&order)
	if result.Error != nil {
		log.Println(result.Error)
		c.JSON(500, gin.H{
			"message": "Create order failed with error: " + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, order)
}

func DeleteOrderById(c *gin.Context) {
	db := connectDB()
	var order Order

	queryResult := db.Where("id = $1", c.Param("OrderId")).Take(&order)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "Delete order failed with error: " + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}

	result := db.Delete(&order)

	if result.Error != nil {
		log.Println(result.Error)

		c.JSON(500, gin.H{
			"message": "Delete order failed with error: " + result.Error.Error(),
		})

		closeDB(db)
		return
	}

	closeDB(db)
	c.JSON(200, gin.H{
		"message": "Delete orders Susseccfully",
	})
}


func UpdateOrderById(c *gin.Context) {
	db := connectDB()
	var order Order

	queryResult := db.Where("id = $1", c.Param("OrderId")).Take(&order)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "Update order failed with error: " + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}
	var orderBody *Order

	c.BindJSON(&orderBody)
	orderBody.Id = order.Id
	result := db.Model(&order).Where("id = ?", order.Id).Updates(orderBody)

	if result.Error != nil {
		log.Println(result.Error)

		c.JSON(500, gin.H{
			"message": "Update order failed with error: " + result.Error.Error(),
		})

		closeDB(db)
		return
	}

	closeDB(db)
	c.JSON(200, gin.H{
		"message": "Update orders Susseccfully",
	})
}