package utils

import (
	"fmt"
	"strings"
	"regexp"
)

var slugPattern = regexp.MustCompile(`^[a-z0-9]+(-[a-z0-9]+)*$`)

var reservedSlugs = map[string]bool{
	"api": true, "auth": true, "login": true, "register": true,
	"home": true, "profile": true, "sandbox": true, "uploads": true,
	"forgot-password": true, "reset-password": true, "verify-otp": true,
	"public": true, "test": true, "logout": true,
}

func NormalizeSlug(raw string) (string, error) {

	slug := strings.ToLower(strings.TrimSpace(raw))

	if len(slug) < 3 || len(slug) > 60 {
		return "", fmt.Errorf("slug must be between 3 and 60 characters")
	}

	if !slugPattern.MatchString(slug) {
		return "", fmt.Errorf("slug can only contain lowercase letters, numbers and single hyphens")
	}

	if reservedSlugs[slug] {
		return "", fmt.Errorf("this slug is reserved, please choose another")
	}

	return slug, nil

}