

# Stage 1: Build the React application
FROM node:20-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY frontend/package*.json ./

# Install dependencies
RUN npm install --production

# Set environment variable
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Copy the rest of the application code
COPY /frontend .

# Build the React app for production
RUN npm run build

# Stage 2: Run backend
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# ENV
# ENV MONGO_URL=""
# ENV JWT_SECRET=""
# ENV JWT_LIFETIME=""
# ENV API_KEY=""

# Copy package.json and package-lock.json (if available)
COPY backend/package*.json ./

# Install dependencies
RUN npm install --production

COPY --from=build /app/build  /app/build

# Copy the rest of the application code
COPY /backend .

RUN npx prisma migrate deploy

# Expose the port that the app runs on
EXPOSE 7002

# Command to run the application
CMD ["node", "app.js"]
