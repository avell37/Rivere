import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as argon2 from 'argon2';
import { PrismaClient, UserRole } from '@prisma/client';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    const username = process.env.ADMIN_USERNAME!;
    const email = process.env.ADMIN_EMAIL!;
    const password = process.env.ADMIN_PASSWORD!;

    const hashedPassword = await argon2.hash(password);

    await prisma.user.upsert({
        where: { email },
        update: {
            role: UserRole.CREATOR,
        },
        create: {
            username,
            email,
            password: hashedPassword,
            nickname: username,
            role: UserRole.CREATOR,
        },
    });
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
