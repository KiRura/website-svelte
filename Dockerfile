FROM archlinux:base

RUN pacman -Syuu --noconfirm
RUN pacman -S --needed nodejs pnpm curl wget --noconfirm

WORKDIR /app
COPY . .

RUN pnpm i --frozen-lockfile
RUN pnpm run build

CMD [ "node" "build" ]
