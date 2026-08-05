package middlewares

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	"server/utils"
)

func AuthRequired(c *gin.Context) {

	token, err := c.Cookie("token")

	fmt.Println("TOKEN:",token)
	fmt.Println("ERR:",err)

	if err != nil || token == "" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "login required",
		})
		return 
	}

	claims, err := utils.ParseToken(token)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "invalid or expired token",
		})
		return
	}

	c.Set("user_id",claims["user_id"])
	c.Set("role",claims["role"])

	c.Next()

}