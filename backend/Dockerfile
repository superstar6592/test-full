# Stage 1: Build
FROM node:18-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
RUN npm rebuild bcrypt
COPY . .

# Stage 2: Runtime
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 8000
CMD ["npm", "start"]