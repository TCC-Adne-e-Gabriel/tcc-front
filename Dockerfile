FROM node:20

COPY frontend/package*.json ./

RUN npm ci
  && addgroup --gid 1001 --system app && \
  adduser --no-create-home --shell /bin/false
    --disabled-password --uid 1001 --system --group app

USER app

WORKDIR /app

COPY frontend/ .

EXPOSE 3000

CMD ["npm", "start"]
