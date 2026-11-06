FROM node:26-slim AS base
SHELL ["/bin/bash", "-c"]

RUN apt update
RUN apt install -y curl wget
RUN wget -qO- https://get.pnpm.io | bash -
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH="$PNPM_HOME/bin:$PATH"

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
