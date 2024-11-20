FROM node:alpine
WORKDIR .
COPY ./build ./app
COPY ./package.json ./package.json
RUN npm install --only=production
CMD ["serve", "-s", "."]