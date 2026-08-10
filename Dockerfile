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
COPY --from=build /app/build ./build

COPY package.json deno.json deno.lock ./
RUN deno ci --prod

COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
