

# Stage 1: Build the React application
FROM node:14-alpine as build

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
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# ENV
ARG MONGO_URL
ENV MONGO_URL=$MONGO_URL
ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET
ARG JWT_LIFETIME
ENV JWT_LIFETIME=$JWT_LIFETIME
ARG API_KEY
ENV API_KEY=$API_KEY

# Copy package.json and package-lock.json (if available)
COPY backend/package*.json ./

# Install dependencies
RUN npm install --production

COPY --from=build /app  .

# Copy the rest of the application code
COPY /backend .

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]
