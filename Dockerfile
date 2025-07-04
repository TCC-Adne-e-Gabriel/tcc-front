FROM node:20-alpine AS base

RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

USER app

WORKDIR /usr/src/app

COPY --chown=app:app package*.json ./
RUN npm ci

COPY --chown=app:app . ./

EXPOSE 3000
CMD ["npm", "start"]