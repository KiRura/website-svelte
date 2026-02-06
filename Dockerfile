FROM node:25-alpine

RUN apt-get update && apt-get upgrade -y && apt-get install -y curl wget pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm run build

CMD [ "node" "build" ]
