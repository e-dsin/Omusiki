FROM node:22-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY apps/cms/package.json apps/cms/package.json
COPY apps/functions/package.json apps/functions/package.json
COPY apps/mobile/package.json apps/mobile/package.json
COPY apps/legacy-web/package.json apps/legacy-web/package.json
COPY packages/db/package.json packages/db/package.json
COPY packages/types/package.json packages/types/package.json

RUN npm ci

COPY . .
RUN npm exec -w @omusiki/db -- prisma generate

EXPOSE 3001
CMD ["sh", "docker/api-entrypoint.sh"]
