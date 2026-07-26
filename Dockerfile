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
RUN npm i --omit dev
COPY --from=build /app/build ./

CMD ["node", "./build"]
