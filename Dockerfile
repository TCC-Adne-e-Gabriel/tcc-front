FROM node:20-alpine AS base

RUN apk add --no-cache \
  build-base \
  make \
  g++

RUN addgroup -S app && adduser -S -G app app

USER app

WORKDIR /usr/src/app

COPY --chown=app:app package*.json ./
RUN npm ci

COPY --chown=app:app . ./

EXPOSE 3000
CMD ["npm", "start"]