package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			fmt.Fprintf(w, `
<h2>The Welcome/Terms of Service app is running</h2> <p>Follow the
instructions in the README to configure the Slack App and your
environment variables.</p>
		`)
		case http.MethodPost:
			// handle posts to the base route for challenges
			respondToChallenge(r)
		}

	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func respondToChallenge(r *http.Request) {

}
