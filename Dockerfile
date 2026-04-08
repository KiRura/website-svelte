FROM node:24-alpine AS build

RUN apk -U upgrade
RUN npm i -g corepack@latest
RUN corepack enable pnpm

WORKDIR /app
COPY . .

RUN pnpm i --frozen-lockfile
RUN pnpm run build

FROM denoland/deno:alpine AS run

RUN apk -U upgrade
RUN apk add curl wget

WORKDIR /app
COPY --from=build /app .

CMD [ "deno", "-A", "/app/build/index.js" ]
