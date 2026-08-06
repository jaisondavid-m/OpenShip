ARG GO_VERSION=1.26
FROM golang:${GO_VERSION} AS builder

WORKDIR /app

RUN apk add --no-cache git ca-certificates

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /out/server .

FROM alpine:3.20

RUN apk add --no-cache ca-certificates tzdata && \
    addgroup -S app && adduser -S app -G app

WORKDIR /app

COPY --from=builder /out/server /app/server

RUN mkdir -p /app/uploads/avatars && chown -R app:app /app

USER app

EXPOSE 8080

ENTRYPOINT ["/app/server"]