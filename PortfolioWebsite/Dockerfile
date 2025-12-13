# ---------- Stage 1: Build frontend (Next.js static export) ----------
FROM node:20-bullseye AS frontend-build

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY frontend ./

# Build Next.js static export
RUN npm run build

# ---------- Stage 2: Build backend ----------
FROM golang:1.21 AS backend-build

WORKDIR /build

# Copy Go modules and download dependencies
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copy Go source code
COPY backend ./

# Copy built frontend into backend directory
COPY --from=frontend-build /app/out ./frontend

# Build the Go executable
RUN CGO_ENABLED=0 GOOS=linux go build -o PortfolioWebsite

# ---------- Stage 3: Final image ----------
FROM debian:bullseye-slim

WORKDIR /app

# Optional: Install CA certificates if making outbound HTTPS requests
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy built Go binary + frontend from builder
COPY --from=backend-build /build/PortfolioWebsite ./
COPY --from=backend-build /build/frontend ./frontend

# Expose port
EXPOSE 3002

# Run the app
CMD ["./PortfolioWebsite"]
