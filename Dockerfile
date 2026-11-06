FROM node:26 AS base
RUN apt update
RUN apt full-upgrade -y
RUN npx get-pnpm

FROM base AS build

WORKDIR /app
COPY . .
RUN pnpm ci
RUN pnpm build

FROM base AS run
WORKDIR /app
COPY --from=build /app/build ./build

COPY package.json pnpm-* ./
RUN pnpm ci --prod

CMD [ "node", "./build/index.js" ]
