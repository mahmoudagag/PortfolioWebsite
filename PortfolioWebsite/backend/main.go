package main

import (
	"os"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("./build", true)))
	router.Static("/VisualizeSearchingAlogrithms", "./Visualize-Search-Algorithms")
	router.Static("/VisualizeSortingAlogrithms", "./Visual-Sorting-Algorithms")

	port := os.Getenv("PORT")
	if port == "" {
		println("listening to port: 8080")
		router.Run(":8080")
	} else {
		println("listening to port: " + port)
		router.Run(":" + port)
	}
}
