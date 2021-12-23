FROM node:16.13.1-slim

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3030

CMD ["npm", "start"]
