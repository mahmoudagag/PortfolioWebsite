# Stage 1: Build frontend (Next.js static export)
FROM node:20-bullseye as build_frontend

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend .

# THIS generates static files into /app/out
RUN npm run build

# Stage 2: Build backend
FROM golang:1.21 AS build_backend

WORKDIR /build

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend .

# Copy static build from Next.js
COPY --from=build_frontend /app/out ./frontend

# Build Go app
RUN CGO_ENABLED=0 GOOS=linux go build -o PortfolioWebsite

EXPOSE 3001
CMD ["./PortfolioWebsite"]
