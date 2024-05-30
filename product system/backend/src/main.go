package main

import (
	"go_gin_example/controller"
	"go_gin_example/envconfig"
	"log"

	"github.com/gin-gonic/gin"

	_ "github.com/lib/pq"
)

func getDBInfo(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Port" + envconfig.GetEnv("DB_PORT"),
	})
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
	 c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	 c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	 c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Category, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	 c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")
	 if c.Request.Method == "OPTIONS" {
	  c.AbortWithStatus(204)
	  return
	 }
	 c.Next()
	}
   }

func main() {
	server := gin.Default()
	server.Use(CORSMiddleware())

	//RESTful API

	server.GET("/categories", controller.GetCategories)                 // 讀取categorys
	server.GET("/categories/:CategoryId", controller.GetCategoryById) // 讀取categorys

	server.GET("/customers", controller.GetCustomers)                             // 讀取customers
	server.GET("/customers/:CustomerId", controller.GetCustomerById)             // 讀取customers
	server.GET("/customers/:CustomerId/orders", controller.GetOrderByCustomerId) // 讀取Orders of Customer
	server.POST("/customers", controller.CreateCustomers)                        // 新增customers
	server.DELETE("/customers/:CustomerId", controller.DeleteCoustomerById)      // 刪除customers

	server.GET("/products", controller.GetProducts)                // 讀取products
	server.GET("/products/:ProductId", controller.GetProductById) // 讀取products
	server.POST("/products", controller.CreateProducts)            // 新增products
	server.DELETE("/products/:ProductId", controller.DeletePruductById) // 刪除products
	server.PUT("/products/:ProductId", controller.UpdateProductById) // 更新products


	server.GET("/orders", controller.GetOrders)                         // 讀取orders
	server.GET("/orders/:OrderId", controller.GetOrderById)            // 讀取orders
	server.GET("/orders/:OrderId/items", controller.GetItemsByOrderId) // 讀取Items of Order
	server.POST("/orders", controller.CreateOrders)                    // 新增orders
	server.DELETE("/orders/:OrderId", controller.DeleteOrderById)      // 刪除orders
	server.PUT("/orders/:OrderId", controller.UpdateOrderById)         // 更新orders

	server.GET("/items", controller.GetItems)             // 讀取items
	server.GET("/items/:ItemId", controller.GetItemById) // 讀取items
	server.PUT("/items/:ItemId", controller.UpdateItemById) // 更新items

	if err := server.Run(":" + envconfig.GetEnv("PORT")); err != nil {
		log.Fatalln(err.Error())
		return
	}
}

