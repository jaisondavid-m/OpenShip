package routes

import (
	"github.com/gin-gonic/gin"

	"server/handlers"
	"server/middlewares"
)

func Register(r *gin.Engine) {

	api := r.Group("/api")

	v1 := api.Group("/v1")
	{
		v1.GET("/health", handlers.Health)
	}

	auth := v1.Group("/auth")
	{
		auth.POST("/login", handlers.Login)
		auth.POST("/register", handlers.Register)
		auth.GET("/me", middlewares.AuthRequired, handlers.Me)
		auth.POST("/logout", handlers.Logout)

		auth.POST("/forgot-password", handlers.ForgotPassword)
		auth.POST("/verify-otp", handlers.VerifyOTP)
		auth.POST("/reset-password", handlers.ResetPassword)

	}

	profile := v1.Group("/profile")
	profile.Use(middlewares.AuthRequired)
	{
		profile.GET("/mine", handlers.GetProfile)
		profile.POST("/avatar", handlers.UploadAvatar)
	}

	sandbox := v1.Group("/sandbox")
	{
		sandbox.POST("", handlers.SaveSnippet)
		sandbox.GET("", handlers.ListSnippets)
		sandbox.GET("/:id",handlers.GetSnippet)
		sandbox.GET("/:id", handlers.GetSnippet)
		sandbox.DELETE("/:id", handlers.DeleteSnippet)
	}

	v1.GET("/public/:slug", handlers.GetPublicSnippetBySlug)

}