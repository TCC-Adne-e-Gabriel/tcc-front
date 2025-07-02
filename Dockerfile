FROM node:18-alpine AS base

WORKDIR /usr/src/app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/. ./

FROM base AS dev

EXPOSE 3000
CMD ["npm", "start"]

FROM base AS ci
