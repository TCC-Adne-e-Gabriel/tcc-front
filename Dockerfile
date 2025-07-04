FROM node:20-alpine AS base

RUN apk add --no-cache build-base make g++ && \
    addgroup --gid 1001 --system app && \
    adduser --no-create-home --shell /bin/false \
    --disabled-password --uid 1001 --system --group app

USER app

WORKDIR /usr/src/app

COPY --chown=app:app package*.json ./
RUN npm ci

COPY --chown=app:app . ./

EXPOSE 3000
CMD ["npm", "start"]