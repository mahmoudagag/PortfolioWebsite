# ---------- Stage 1: Build frontend ----------
FROM node:14-alpine AS frontend-build

WORKDIR /app

# Copy package files first to leverage caching
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci --omit=dev

COPY frontend/ ./

# Build the React app
ENV PUBLIC_URL="/whatstheword"
RUN npm run build

# ---------- Stage 2: Backend ----------
FROM node:14-alpine

WORKDIR /app

# Copy backend package files and install only production dependencies
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy built frontend from previous stage
COPY --from=frontend-build /app/build ./build

# Copy backend source
COPY backend/ ./

# Expose port
EXPOSE 5002

# Start the backend
CMD ["node", "app.js"]
