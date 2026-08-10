#!/bin/env sh

exec deno --allow-read=./build/client,./build/prerendered \
   -E \
   --allow-net=0.0.0.0:3000,$MICRO_CMS_SUBDOMAIN.microcms.io:443 \
   ./build/index.js
