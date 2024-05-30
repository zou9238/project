package controller

import (
	//"go_gin_example/model"
	"gorm.io/gorm/clause"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"log"
)

type Customer struct {
	Id   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

type CustomerWithOrders struct {
	Customer
	Orders []Order `gorm:"foreignKey:Customer_id"`
}

func (CustomerWithOrders) TableName() string {
	return "customers"
}

func GetCustomers(c *gin.Context) {

	db := connectDB()

	var customers []*Customer

	db.Find(&customers)

	closeDB(db)
	c.IndentedJSON(200, customers)

}

func GetCustomerById(c *gin.Context) {
	db := connectDB()
	var customer *Customer
	db.Where("id = $1", c.Param("CustomerId")).Take(&customer)

	closeDB(db)
	c.JSON(200, customer)
}

func GetOrdersByCustomerId(c *gin.Context) {
	db := connectDB()
	var customer *CustomerWithOrders
	queryResult := db.Preload(clause.Associations).Where("id = $1", c.Param("CustomerId")).Take(&customer)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "Get customer failed with error: " + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, customer.Orders)
}

func CreateCustomers(c *gin.Context) {
	db := connectDB()
	var customer Customer
	c.BindJSON(&customer)

	result := db.Create(&customer)
	if result.Error != nil {
		log.Println(result.Error)
		c.JSON(500, gin.H{
			"message": "Create customer failed with error: " + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, customer)
}

func DeleteCoustomerById(c *gin.Context) {
	db := connectDB()
	var customer Customer

	queryResult := db.Where("id = $1", c.Param("CustomerId")).Take(&customer)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "Delete customer failed with error: " + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}

	result := db.Delete(&customer)

	if result.Error != nil {
		log.Println(result.Error)

		c.JSON(500, gin.H{
			"message": "Delete customer failed with error: " + result.Error.Error(),
		})

		closeDB(db)
		return
	}

	closeDB(db)
	c.JSON(200, gin.H{
		"message": "Delete customers Susseccfully",
	})
}
