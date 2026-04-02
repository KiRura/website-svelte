FROM node:current

RUN apt update
RUN apt upgrade -y
RUN apt install curl wget pnpm -y

WORKDIR /app
COPY . .

RUN pnpm i --frozen-lockfile
RUN pnpm run build

FROM denoland/deno:latest

CMD [ "deno", "-A", "/app/build/index.js" ]
