package helper

import "github.com/gin-gonic/gin"

func GetUserID(c *gin.Context) (uint64, bool) {

	v, exists := c.Get("user_id")

	if !exists {
		return 0, false
	}

	switch id := v.(type) {
	case float64:
		return uint64(id), true
	case uint64:
		return id, true
	case uint:
		return uint64(id), true
	default:
		return 0, false
	}

}