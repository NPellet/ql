package main

import (
	"context"
	"fmt"
	"io"
	"net"
	"net/http"
	"os"
	"os/signal"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var cmd = &cobra.Command{
	Run: func(cmd *cobra.Command, args []string) {
		ctx := context.Background()
		ctx, _ = signal.NotifyContext(ctx, os.Interrupt, os.Kill)

		engine := gin.New()
		registerRoutes(engine)

		api := http.Server{
			Addr:    ":" + viper.GetString("port"),
			Handler: engine,
			BaseContext: func(l net.Listener) context.Context {
				return ctx
			},
		}

		go func() {
			fmt.Println("Starting server on port " + viper.GetString("port"))
			api.ListenAndServe()
		}()

		<-ctx.Done()

		api.Close()
	},
}

type trialImages struct {
	Control   []string `json:"Control"`
	Trial     []string `json:"Trial"`
	TrialName string   `json:"TrialName"`
}

func registerRoutes(engine *gin.Engine) {

	engine.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST"},
	}))

	engine.GET("/trays", func(c *gin.Context) {
		files := []*trialImages{}

		path := viper.GetString("images")
		entries, err := os.ReadDir(path)
		if err != nil {
			fmt.Printf("Error while getting trays: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		for _, entry := range entries {
			trial := &trialImages{TrialName: entry.Name()}
			if entry.IsDir() {
				files = append(files, trial)
			}

			trial.Control = readFiles(path+"/", entry.Name()+"/control")
			trial.Trial = readFiles(path+"/", entry.Name()+"/trial")
		}

		c.JSON(http.StatusOK, files)
	})

	engine.POST("/log", func(ctx *gin.Context) {
		// Body is json encoded with the username, the type (control/trial), and the time between the moment the image gets shown to the picker and the moment the picker clicks on the image
		// Use bindings
		bdy, err := io.ReadAll(ctx.Request.Body)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		logToFile(string(bdy))
	})
}

func logToFile(message string) {
	f, err := os.OpenFile(viper.GetString("logfile"), os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return
	}

	f.WriteString(message + "\n")
	f.Close()
}

func readFiles(prefix string, path string) []string {
	entries, err := os.ReadDir(prefix + path)
	if err != nil {
		return []string{}
	}

	files := []string{}
	for _, entry := range entries {
		if !entry.IsDir() {
			// Check that the entry is an png by checking the extension
			if entry.Name()[len(entry.Name())-4:] == ".png" {
				files = append(files, path+"/"+entry.Name())
			}
		}
	}

	return files
}

func init() {
	viper.BindEnv("images", "IMAGES")
	cmd.PersistentFlags().String("images", "", "Path to the folder containing the images")

	viper.BindEnv("logfile", "LOG_FILE")
	cmd.PersistentFlags().String("logfile", "", "Path to the logfile")

	viper.BindEnv("port", "PORT")
	cmd.PersistentFlags().String("port", "", "Port to use")

	viper.BindPFlags(cmd.PersistentFlags())
}

func main() {
	cmd.Execute()
}
