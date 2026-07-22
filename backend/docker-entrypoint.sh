#!/bin/sh
set -e

echo "--- Running migrations"
npx prisma migrate deploy --config prisma.config.ts

echo "--- Running seed"
npx prisma db seed --config prisma.config.ts

echo "--- Starting server"
node dist/src/main.js
