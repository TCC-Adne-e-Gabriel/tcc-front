FROM node:20

WORKDIR /app

COPY frontend/package*.json ./

RUN npm ci

COPY frontend/ .

EXPOSE 3000

CMD ["npm", "start"]
