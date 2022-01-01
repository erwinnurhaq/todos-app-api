FROM node:17-slim

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8090

CMD ["npm", "start"]
