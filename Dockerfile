FROM node:24-alpine

RUN npm install -g corepack --force
RUN corepack enable pnpm

WORKDIR /app
COPY . .

RUN pnpm i --frozen-lockfile
RUN pnpm run build

CMD [ "node" "build" ]
