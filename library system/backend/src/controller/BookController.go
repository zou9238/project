package controller

import (
	"fmt"
	"go_gin_example/envconfig"
	"log"

	_ "github.com/GoogleCloudPlatform/cloudsql-proxy/proxy/dialers/postgres"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"gorm.io/gorm/logger"
)

type Book struct {
	Id       uuid.UUID `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()" json:"id"`
	AuthorId uuid.UUID `gorm:"foreignKey" json:"author_id"`
	ClassId  uuid.UUID `gorm:"foreignKey" json:"class_id"`
	Name     string    `json:"name"`
	ISBN     string    `json:"isbn"`
	Publish  string    `json:"publish"`
	State    string    `json:"state"`
	Author   Author    `gorm:"foreignKey:AuthorId"`
	Class    Class     `gorm:"foreignKey:ClassId"`
}

type BookWithAuthor struct {
	Book
	Author *Author `josn:"author,omitempty"`
}

func (BookWithAuthor) TableName() string {
	return "books"
}

type BookWithClass struct {
	Book
	Class *Class `josn:"class,omitempty"`
}

func (BookWithClass) TableName() string {
	return "books"
}

type BookWithAll struct {
	Book
	Author *Author `josn:"author,omitempty"`
	Class  *Class  `josn:"class,omitempty"`
}

func (BookWithAll) TableName() string {
	return "books"
}

func GetBooks(c *gin.Context) {
	isbn := c.Query("isbn")
	name := c.Query("name")
	author := c.Query("authorId")
	class := c.Query("classId")
	publish := c.Query("publish")

	db := connectDB()
	var books []*BookWithAll
	if isbn != "" {
		log.Println("isbn:" + isbn)
		db.Preload(clause.Associations).Where("isbn = $1", isbn).Find(&books)
	} else if name != "" {
		log.Println("name:" + name)
		db.Preload(clause.Associations).Where("name = $1", name).Find(&books)
	} else if author != "" {
		log.Println("author:" + author)
		db.Preload(clause.Associations).Where("author = $1", author).Find(&books)
	} else if class != "" {
		log.Println("class:" + class)
		db.Preload(clause.Associations).Where("class = $1", class).Find(&books)
	} else if publish != "" {
		log.Println("publish:" + publish)
		db.Preload(clause.Associations).Where("publish = $1", publish).Find(&books)
	} else {
		db.Preload(clause.Associations).Find(&books)
	}

	closeDB(db)
	c.JSON(200, books)
}

// book 搜尋
func GetBooksByName(c *gin.Context) {
	db := connectDB()
	var books []*Book
	db.Where("name = $1", c.Param("name")).Find(&books)
	closeDB(db)
	c.JSON(200, books)
}

func GetBookById(c *gin.Context) {
	db := connectDB()
	var book *Book

	queryResult := db.Where("id = $1", c.Param("id")).Take(&book)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "查無此書",
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, book)
}

func GetBookByAuthor(c *gin.Context) {
	db := connectDB()
	var books []*Book
	db.Where("author = $1", c.Param("author")).Find(&books)
	closeDB(db)
	c.JSON(200, books)
}

func GetBookByClass(c *gin.Context) {
	db := connectDB()
	var books []*Book
	db.Where("class = $1", c.Param("class")).Find(&books)
	closeDB(db)
	c.JSON(200, books)
}

// book 新增
func CreateBook(c *gin.Context) {
	db := connectDB()
	var book *Book
	c.BindJSON(&book)
	result := db.Create(&book)
	if result.Error != nil {
		log.Println(result.Error)
		c.JSON(500, gin.H{
			"message": "新增失敗" + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, book)
}

// book 修改
func UpdateBook(c *gin.Context) {
	db := connectDB()
	var book *Book

	queryResult := db.Where("id = $1", c.Param("id")).Take(&book)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "修改失敗" + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}
	var bookbody *Book

	c.BindJSON(&bookbody)
	bookbody.Id = book.Id

	result := db.Model(&book).Where("id=?", book.Id).Updates(&bookbody)

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

// book 刪除
func DeleteBook(c *gin.Context) {
	db := connectDB()
	var book *Book

	queryResult := db.Where("id = $1", c.Param("id")).Take(&book)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "刪除失敗" + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}

	result := db.Delete(&book)

	if result.Error != nil {
		log.Println(result.Error)
		c.JSON(500, gin.H{
			"message": "刪除失敗" + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, book)
}

func connectDB() *gorm.DB {
	var dsn string = fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=Asia/Taipei",
		envconfig.GetEnv("DB_HOST"), envconfig.GetEnv("DB_USER"), envconfig.GetEnv("DB_PASSWORD"), envconfig.GetEnv("DB_NAME"), envconfig.GetEnv("DB_PORT"), envconfig.GetEnv("DB_WITH_SSL"))

	var db *gorm.DB
	var err error
	if envconfig.GetEnv("DB_Source") == "gcp" {
		db, err = gorm.Open(postgres.New(postgres.Config{
			DriverName: "cloudsqlpostgres",
			DSN:        dsn,
		}), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Info),
		})
	} else {
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	}

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
