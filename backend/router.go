package router

import (
	"defectmgmt/controllers"
	"defectmgmt/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.POST("/api/register", controllers.Register)
	r.POST("/api/login", controllers.Login)
	auth := r.Group("/api")
	auth.Use(middleware.JWTMiddleware())
	auth.POST("/projects", controllers.CreateProject)
	auth.GET("/projects", controllers.ListProjects)
	auth.POST("/defects", controllers.CreateDefect)
	auth.GET("/defects", controllers.GetDefects)
	auth.GET("/defects/:id", controllers.GetDefect)
	auth.PUT("/defects/:id", controllers.UpdateDefect)
	auth.POST("/comments", controllers.CreateComment)
	return r
}
