# ---------- Stage 1: Build frontend ----------
FROM node:14-alpine AS frontend-build

WORKDIR /app

# Copy package files first to leverage caching
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Set build-time environment variables
ARG REACT_APP_BASE_BACKEND_URL
ARG REACT_APP_WEBSOCKET_PATH
ENV REACT_APP_BASE_BACKEND_URL=$REACT_APP_BASE_BACKEND_URL
ENV REACT_APP_WEBSOCKET_PATH=$REACT_APP_WEBSOCKET_PATH

# Copy frontend source
COPY frontend/ ./

# Build the React app
ARG BACKEND_URL
ENV PUBLIC_URL=$BACKEND_URL
RUN npm run build

# ---------- Stage 2: Backend ----------
FROM node:14-alpine

WORKDIR /app

# Copy backend package files and install only production dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy built frontend from previous stage
COPY --from=frontend-build /app/build ./build

# Copy backend source
COPY backend/ ./

# Expose port
EXPOSE 5002

# Start the backend
CMD ["node", "app.js"]
