FROM node:16.13.1-slim

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]
