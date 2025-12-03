FROM node:20-alpine
LABEL authors="cstefc"

WORKDIR /app

COPY package.json ./package.json

RUN npm install .
RUN npm install -g serve

# Copy build output
COPY build ./build

# Expose port
EXPOSE 3000

# Run serve in single-page mode
CMD ["serve", "-s", "build", "-l", "3000"]
