FROM node:25-alpine

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN npm install -g corepack
RUN corepack enable pnpm
RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm run build

CMD [ "node" "build" ]
