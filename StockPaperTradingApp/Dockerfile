##########################
# Stage 1: Build React frontend
##########################
FROM node:14-alpine AS build_frontend

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY frontend/package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY frontend/ ./

# Build React app for production
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ARG BACKEND_URL
ENV PUBLIC_URL=$BACKEND_URL
RUN npm run build

##########################
# Stage 2: Build Go backend
##########################
FROM golang:1.21-alpine AS build_backend

WORKDIR /build

# Install git (needed if go.mod pulls from git) and ca-certificates for TLS
RUN apk add --no-cache git ca-certificates

# Copy go.mod and go.sum first (cache deps)
COPY backend/go.mod backend/go.sum ./

# Download dependencies
RUN go mod download

# Copy rest of source
COPY backend/ ./

# Build the Go binary statically (small, no libc dependency)
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o StockPaperTrading

##########################
# Stage 3: Final minimal image
##########################
FROM alpine:3.18

# Install ca-certificates for HTTPS calls
RUN apk add --no-cache ca-certificates

WORKDIR /app

# Copy Go binary
COPY --from=build_backend /build/StockPaperTrading .

# Copy built React frontend
COPY --from=build_frontend /app/build ./build

# Expose port (optional, useful for docker-compose)
EXPOSE 8002

# Run the Go app
CMD ["./StockPaperTrading"]
