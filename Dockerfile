FROM node:current

RUN apt update && apt upgrade -y && apt install -y curl wget pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm run build

CMD [ "node" "build" ]
