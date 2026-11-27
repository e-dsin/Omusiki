#!/bin/sh
set -eu
. /app/docker/resolve-db.sh
exec "$@"
