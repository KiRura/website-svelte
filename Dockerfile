FROM node:latest AS base
RUN apt update
RUN apt install -y curl

FROM base AS build

WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM base AS run
WORKDIR /app
COPY package*.json ./
COPY --from=build /app/build ./build
RUN npm i --omit dev

CMD ["node", "./build"]
