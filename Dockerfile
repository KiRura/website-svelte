FROM node:current-alpine AS build

RUN apt update
RUN apt upgrade -y
RUN apt install curl wget pnpm -y

WORKDIR /app
COPY . .

RUN pnpm i --frozen-lockfile
RUN pnpm run build

FROM denoland/deno:alpine AS run

WORKDIR /app
COPY --from=build /app/build .

CMD [ "deno", "-A", "/app/index.js" ]
