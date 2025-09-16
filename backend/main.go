package main

import (
	"defectmgmt/config"
	"defectmgmt/database"
	"defectmgmt/router"
	"os"
)

func main() {
	config.LoadEnv()
	database.Connect()
	r := router.SetupRouter()
	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
