# Use an official Node.js runtime as a parent image
#FROM node:18

# Set the working directory inside the container
#WORKDIR /app

# Copy package.json and package-lock.json
#COPY package*.json ./

# Install dependencies
#RUN npm install

# Copy the rest of your application code
#COPY . .

# Expose the application port (change if your app uses a different port)
#EXPOSE 3100

# Start the application
#CMD ["npm", "start"]
# Stage 1: Build
FROM node:18-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

# Stage 2: Runtime
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 8000
CMD ["npm", "start"]
