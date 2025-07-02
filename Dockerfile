FROM node:18-alpine AS base

WORKDIR /usr/src/app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/. ./

COPY sonar-project.properties ./

FROM base AS dev

EXPOSE 3000
CMD ["npm", "start"]

FROM base AS ci

RUN apk add --no-cache curl unzip openjdk17

RUN curl -L -o sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip && \
    unzip sonar-scanner.zip && \
    mv sonar-scanner-5.0.1.3006-linux /opt/sonar-scanner && \
    ln -s /opt/sonar-scanner/bin/sonar-scanner /usr/local/bin/sonar-scanner && \
    rm sonar-scanner.zip