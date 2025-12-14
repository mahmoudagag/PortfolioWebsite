# ---------- Stage 1: Build frontend ----------
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci

# Set environment variable
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

COPY frontend .
ARG BACKEND_URL
ENV PUBLIC_URL=$BACKEND_URL
RUN npm run build

# ---------- Stage 2: Backend ----------
FROM node:20-alpine
WORKDIR /app

# Only production deps
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY backend .

# Generate Prisma client
RUN npx prisma generate

# Copy frontend build
COPY --from=frontend-build /app/build ./build

EXPOSE 7002
CMD ["node", "app.js"]
