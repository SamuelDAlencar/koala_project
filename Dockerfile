FROM node:16.14-alpine

WORKDIR /app

COPY . ./

CMD ["npm", "start"]
