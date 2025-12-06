# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY tsconfig.json vite.config.mts index.html ./
COPY src ./src

# Build
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built files
COPY --from=build /app/build ./build

# Expose port
EXPOSE 3000

# Serve static files
CMD ["serve", "-s", "build", "-l", "3000"]
