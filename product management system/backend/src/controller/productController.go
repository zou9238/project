package controller

import (
	//"go_gin_example/model"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"fmt"
	"go_gin_example/envconfig"
	"log"
)

type Product struct {
	Id          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Price       string    `json:"price"`
	Category_id uuid.UUID `json:"category_id"`
}

func GetProducts(c *gin.Context) {

	db := connectDB()

	var products []*Product

	db.Find(&products)

	closeDB(db)
	c.IndentedJSON(200, products)

}
																	
func GetProductById(c *gin.Context) {
	db := connectDB()
	var product *Product
	db.Where("id = $1", c.Param("ProductId")).Take(&product)

	closeDB(db)
	c.JSON(200, product)
}

func CreateProducts(c *gin.Context) {
	db := connectDB()
	var product Product
	c.BindJSON(&product)

	result := db.Create(&product)
	if result.Error != nil {
		log.Println(result.Error)
		c.JSON(500, gin.H{
			"message": "Create product failed with error: " + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, product)
}

func DeletePruductById(c *gin.Context) {
	db := connectDB()
	var product Product

	queryResult := db.Where("id = $1", c.Param("ProductId")).Take(&product)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "Delete product failed with error: " + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}

	result := db.Delete(&product)

	if result.Error != nil {
		log.Println(result.Error)

		c.JSON(500, gin.H{
			"message": "Delete product failed with error: " + result.Error.Error(),
		})

		closeDB(db)
		return
	}

	closeDB(db)
	c.JSON(200, gin.H{
		"message": "Delete products Susseccfully",
	})
}


func UpdateProductById(c *gin.Context) {
	db := connectDB()
	var product Product

	queryResult := db.Where("id = $1", c.Param("ProductId")).Take(&product)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "Update product failed with error: " + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}
	var productBody *Product

	c.BindJSON(&productBody)
	productBody.Id = product.Id
	result := db.Model(&product).Where("id = ?", product.Id).Updates(productBody)

	if result.Error != nil {
		log.Println(result.Error)

		c.JSON(500, gin.H{
			"message": "Update product failed with error: " + result.Error.Error(),
		})

		closeDB(db)
		return
	}

	closeDB(db)
	c.JSON(200, gin.H{
		"message": "Update products Susseccfully",
	})
}
func connectDB() *gorm.DB {
	var dsn string = fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=Asia/Taipei",
		envconfig.GetEnv("DB_HOST"), envconfig.GetEnv("DB_USER"), envconfig.GetEnv("DB_PASSWORD"), envconfig.GetEnv("DB_NAME"), envconfig.GetEnv("DB_PORT"), envconfig.GetEnv("DB_WITH_SSL"))
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	return db
}

func closeDB(db *gorm.DB) {
	sqlDB, err := db.DB()
	if err != nil {
		panic("failed to close database")
	}
	sqlDB.Close()
}
