FROM node:25-alpine

RUN apk update
RUN apk --no-cache add curl wget pnpm

WORKDIR /app
COPY . .

RUN pnpm i --frozen-lockfile
RUN pnpm run build

CMD [ "node", "/app/build" ]
