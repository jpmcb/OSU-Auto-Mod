package main_test

import (
	"bytes"
	"io/ioutil"
	"net/http"
	"net/http/httptest"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"

	. "github.com/jpmcb/OSU-Auto-Mod"
)

var _ = Describe("Main", func() {
	Describe("A get on the base route", func() {
		It("writes the home page", func() {
			req, err := http.NewRequest("GET", "localhost:8080/", nil)
			Expect(err).ToNot(HaveOccurred())

			rec := httptest.NewRecorder()

			WebBrowserConnectedHandler(rec, req)

			res := rec.Result()
			defer res.Body.Close()

			b, err := ioutil.ReadAll(res.Body)
			Expect(err).ToNot(HaveOccurred())

			Expect(res.StatusCode).To(Equal(http.StatusOK))
			Expect(string(bytes.TrimSpace(b))).To(ContainSubstring("The Welcome/Terms"))
		})
	})
})
