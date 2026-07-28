import { defineConfig, env } from 'prisma/config';
import { config } from 'dotenv';

if (!process.env.DATABASE_URL) {
    config();
}

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
        seed: 'node dist/prisma/seed.js',
    },
    datasource: {
        url: env('DATABASE_URL'),
    },
});
