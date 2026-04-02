FROM node:current-alpine AS build

RUN apk -U upgrade
RUN apk add curl wget pnpm

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
