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

	server.GET("/dbinfo", getDBInfo) // 讀取Users

	//Author
	//GET /authors
	server.GET("/authors", controller.GetAuthors)
	//POST /authors
	server.POST("/authors", controller.CreateAuthor)

	//BOOK
	//GET /books
	server.GET("/books", controller.GetBooks)
	//GET /books/:id
	server.GET("/books/:id", controller.GetBookById)
	//GET /books/author/:author
	server.GET("/books/author/:author", controller.GetBookByAuthor)
	//GET /books/class/:class
	server.GET("/books/class/:class", controller.GetBookByClass)
	//GET /books/name/:name
	server.GET("/books/name/:name", controller.GetBooksByName)
	//POST /books
	server.POST("/books", controller.CreateBook)
	//PUT /books/:id
	server.PUT("/books/:id", controller.UpdateBook)
	//DELETE /books/:id
	server.DELETE("/books/:id", controller.DeleteBook)

	//Borrow_list
	//GET /borrow_lists
	server.GET("/borrow_lists", controller.GetBorrow_lists)
	//GET /borrow_lists/:id
	server.GET("/borrow_lists/:id", controller.GetBorrow_listById)
	//POST /borrow_lists
	server.POST("/borrow_lists", controller.CreateBorrow_list)
	//PUT /borrow_lists/:id
	server.PUT("/borrow_lists/:id", controller.UpdateBorrow_list)

	//Class
	//GET /classes
	server.GET("/classes", controller.GetClasses)

	//User
	//GET /users
	server.GET("/users", controller.GetUsers)
	//POST /users
	server.POST("/users", controller.CreateUser)
	//PUT /users/:id
	server.PUT("/users/:id", controller.UpdateUser)

	if err := server.Run(":" + envconfig.GetEnv("PORT")); err != nil {
		log.Fatalln(err.Error())
		return
	}
}
