FROM node:24.14.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1111

CMD ["node", "index.js"]