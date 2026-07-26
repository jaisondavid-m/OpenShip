package utils

import (

	"fmt"
	"math/big"
	"net/smtp"
	"crypto/rand"

	"server/config"

)

func GenerateOTP() (string, error) {

	const digits = "0123456789"

	otp := make([]byte, 6)

	for i := range otp {

		n, err := rand.Int(rand.Reader, big.NewInt(int64(len(digits))))

		if err != nil {
			return "", err
		}
		otp[i] = digits[n.Int64()]
	}

	return string(otp), nil

}

func SendOTPEmail(toEmail, otp string) error {

	subject := "Your password Reset OTP"
	body := fmt.Sprintf("Your OTP code is %s. It expires in %d minutes.", otp, config.OTPExipryMinutes)

	msg := []byte("From: " + config.SMTPFrom + "\r\n" +
		"To: " + toEmail + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"\r\n" +
		body + "\r\n",
	)

	auth := smtp.PlainAuth("", config.SMTPUser, config.SMTPPassword, config.SMTPHost)
	addr := fmt.Sprintf("%s:%s", config.SMTPHost, config.SMTPPort)

	return smtp.SendMail(addr, auth, config.SMTPFrom, []string{toEmail}, msg)

}