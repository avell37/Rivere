echo "--- Running prisma push"
npx prisma db push

echo "--- Running prisma seed"
npx prisma db seed

echo "--- Starting server"
node dist/src/main.js