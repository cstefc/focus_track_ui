FROM node:20-alpine AS build
WORKDIR /app

COPY package.json ./package.json
COPY src ./src
COPY .env ./.env
COPY tsconfig.json ./tsconfig.json
COPY vite.config.mts ./vite.config.mts
COPY index.html ./index.html

RUN npm install .
RUN npm install -g serve
RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY build ./build

# Expose port
EXPOSE 3000

# Run serve in single-page mode
CMD ["serve", "-s", "build", "-l", "3000"]
