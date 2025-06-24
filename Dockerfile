FROM node:18-alpine

WORKDIR /usr/src/app

COPY frontend/package*.json ./

RUN npm ci

CMD ["npm", "audit"]