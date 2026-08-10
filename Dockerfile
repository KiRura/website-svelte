FROM denoland/deno:latest AS base
RUN apt update
RUN apt install -y curl

FROM base AS build

WORKDIR /app
COPY . .
RUN deno ci
RUN deno task build

FROM base AS run
WORKDIR /app
COPY package.json deno.json deno.lock ./
COPY --from=build /app/build ./build
RUN deno ci --prod

CMD ["deno", "--allow-read=./build/client,./build/prerendered", "-E", "--allow-net=0.0.0.0:3000,$MICRO_CMS_SUBDOMAIN.microcms.io:443", "./build/index.js"]
