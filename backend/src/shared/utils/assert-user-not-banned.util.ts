import { ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/core/prisma/prisma.service';

export async function assertUserNotBanned(
    prisma: PrismaService,
    userId: string,
) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { bannedUntil: true },
    });

    if (user?.bannedUntil && new Date(user.bannedUntil) > new Date()) {
        throw new ForbiddenException({
            message: 'Пользователь заблокирован',
            code: 'errors.user.banned',
            bannedUntil: user.bannedUntil,
        });
    }
}
