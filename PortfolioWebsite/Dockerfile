# Stage 1: Build the React application
FROM node:14-alpine as build_frontend

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY frontend/package*.json ./

# Install dependencies
RUN npm install --production

# Set environment variable
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

ARG REACT_APP_PORTFOLIOWEBSITE_PORT
ENV REACT_APP_PORTFOLIOWEBSITE_PORT=$REACT_APP_PORTFOLIOWEBSITE_PORT

ARG REACT_APP_WHATSTHEWORDAPP_PORT
ENV REACT_APP_WHATSTHEWORDAPP_PORT=$REACT_APP_WHATSTHEWORDAPP_PORT
# Copy the rest of the application code
COPY /frontend .

# Build the React app for production
RUN npm run build

# Stage 2: build backend
FROM golang:1.21 AS build_backend

# Set destination for COPY
WORKDIR /build

# Copy go mod and sum files
COPY /backend/go.mod /backend/go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the source code
COPY /backend .
# COPY --from=build_frontend /app .

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux go build -o /build/PortfolioWebsite

# Use scratch (empty) image for final stage
FROM scratch

# Set working directory inside the container
WORKDIR /app

# Copy the built executable from builder stage
COPY --from=build_backend /build/PortfolioWebsite /app/PortfolioWebsite
COPY --from=build_backend /build/Visual-Sorting-Algorithms /app/Visual-Sorting-Algorithms
COPY --from=build_backend /build/Visualize-Search-Algorithms /app/Visualize-Search-Algorithms
COPY --from=build_frontend /app  .

# Specify the command to run the executable
CMD ["/app/PortfolioWebsite"]

