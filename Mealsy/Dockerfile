# ---------- Stage 1: Build frontend ----------
FROM node:20-alpine AS frontend-build
WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci --omit=dev

# ARG APP_NAME
ENV REACT_APP_BACKEND_URL="/mealsy"
ENV PUBLIC_URL="/mealsy"

COPY frontend .
RUN npm run build

# ---------- Stage 2: Backend ----------
FROM node:20-alpine
WORKDIR /app

# Install prod deps only
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Prisma
COPY backend/prisma ./prisma
RUN npx prisma generate

# Backend source
COPY backend .

# Frontend build only
COPY --from=frontend-build /app/build ./build

EXPOSE 7002
CMD ["node", "app.js"]
