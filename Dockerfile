FROM node:16.13.1-slim

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8090

CMD ["npm", "start"]
