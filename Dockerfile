FROM node:25-alpine

RUN npm i -g corepack --force
RUN corepack enable pnpm

WORKDIR /app
COPY . .

RUN pnpm i --frozen-lockfile
RUN pnpm run build

CMD [ "node", "/app/build" ]
