package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	err := http.ListenAndServe(":8080", handler())
	if err != nil {
		log.Fatal(err)
	}
}

func handler() http.Handler {
	r := http.NewServeMux()
	r.HandleFunc("/", baseRouter)
	return r
}

func baseRouter(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		WebBrowserConnectedHandler(w, r)
	case http.MethodPost:
		ChallengeHandler(w, r)
	}
}

// WebBrowserConnectedHandler is ...
func WebBrowserConnectedHandler(w http.ResponseWriter, r *http.Request) error {
	fmt.Fprintf(w, `
<h2>The Welcome/Terms of Service app is running</h2> <p>Follow the
instructions in the README to configure the Slack App and your
environment variables.</p>`)

	return nil
}

// ChallengeHandler will return the JSON token from the challenge
func ChallengeHandler(w http.ResponseWriter, r *http.Request) error {
	return nil
}
