package controller

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm/clause"
)

type Borrow_list struct {
	Id         uuid.UUID `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()" json:"id"`
	UserId     uuid.UUID `gorm:"foreignKey" json:"user_id"`
	BookID     uuid.UUID `gorm:"foreignKey" json:"book_id"`
	Expiration string    `json:"expiration"`
}

type Borrow_listWithUser struct {
	Borrow_list
	User *User `json:"user,omitempty"`
}
type Borrow_listWithBook struct {
	Borrow_list
	Book *Book `json:"book,omitempty"`
}
type Borrow_listWithAll struct {
	Borrow_list
	User *User `json:"user,omitempty"`
	Book *Book `json:"book,omitempty"`
}

func (Borrow_listWithUser) TableName() string {
	return "borrow_lists"
}
func (Borrow_listWithBook) TableName() string {
	return "borrow_lists"
}
func (Borrow_listWithAll) TableName() string {
	return "borrow_lists"
}

func GetBorrow_lists(c *gin.Context) {
	db := connectDB()
	var borrow_lists []*Borrow_listWithAll
	db.Preload(clause.Associations).Find(&borrow_lists)
	closeDB(db)
	c.JSON(200, borrow_lists)
}

func GetBorrow_listById(c *gin.Context) {
	db := connectDB()
	var borrow_list *Borrow_list

	queryResult := db.Where("id = $1", c.Param("id")).Take(&borrow_list)
	if queryResult.Error != nil {
		log.Println(queryResult.Error)
		c.JSON(500, gin.H{
			"message": "查無此借閱紀錄" + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, borrow_list)
}

func CreateBorrow_list(c *gin.Context) {
	db := connectDB()
	var borrow_list *Borrow_list
	c.BindJSON(&borrow_list)
	result := db.Create(&borrow_list)
	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": "新增失敗" + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, borrow_list)
}

func UpdateBorrow_list(c *gin.Context) {
	db := connectDB()
	var borrow_list *Borrow_list

	queryResult := db.Where("id = $1", c.Param("id")).Take(&borrow_list)
	if queryResult.Error != nil {
		c.JSON(500, gin.H{
			"message": "查無此借閱紀錄" + queryResult.Error.Error(),
		})
		closeDB(db)
		return
	}
	var borrow_listbody *Borrow_list
	c.BindJSON(&borrow_listbody)
	borrow_listbody.Id = borrow_list.Id

	result := db.Model(&borrow_list).Where("id = ?", borrow_list.Id).Updates(&borrow_listbody)

	if result.Error != nil {
		c.JSON(500, gin.H{
			"message": "修改失敗" + result.Error.Error(),
		})
		closeDB(db)
		return
	}
	closeDB(db)
	c.JSON(200, borrow_list)
}
