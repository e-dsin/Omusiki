#!/bin/sh
set -eu

. /app/docker/resolve-db.sh

npm exec -w @omusiki/db -- prisma db push --skip-generate
npm exec -w @omusiki/db -- tsx prisma/seed.ts
exec npm run start -w @omusiki/api
