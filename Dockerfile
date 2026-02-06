FROM archlinux:base

RUN pacman -S --needed nodejs-lts-krypton pnpm curl wget --noconfirm

WORKDIR /app
COPY . .

RUN pnpm i --frozen-lockfile
RUN pnpm run build

CMD [ "node" "build" ]
