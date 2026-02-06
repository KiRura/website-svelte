FROM archlinux:base

RUN pacman -Sy --needed nodejs-lts-krypton pnpm curl wget bun --noconfirm

WORKDIR /app
COPY . .

RUN pnpm i --frozen-lockfile
RUN pnpm run build

CMD [ "bun" "./build" ]
