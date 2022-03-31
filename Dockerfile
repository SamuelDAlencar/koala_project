FROM node:16.14-alpine

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . ./

CMD ["npm", "start"]
