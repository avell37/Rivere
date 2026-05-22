import { PrismaService } from '@/core/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);
    public constructor(private readonly prisma: PrismaService) {}

    @Cron(CronExpression.EVERY_MINUTE)
    public async unbanUsers() {
        try {
            const now = new Date();

            const result = await this.prisma.user.updateMany({
                where: {
                    bannedUntil: { not: null, lte: now },
                },
                data: {
                    bannedUntil: null,
                    bannedAt: null,
                    banReason: null,
                },
            });

            if (result.count > 0) {
                this.logger.log(`Разблокировано ${result.count} пользователей`);
            }
        } catch (err) {
            this.logger.error(err);
        }
    }

    @Cron(CronExpression.EVERY_HOUR)
    public async removeExpiredInvites() {
        try {
            const result = await this.prisma.boardInvite.deleteMany({
                where: {
                    expiresAt: {
                        lte: new Date(),
                    },
                },
            });

            if (result.count > 0) {
                this.logger.log(
                    `Удалено ${result.count} просроченных инвайтов`,
                );
            }
        } catch (err) {
            this.logger.error(err);
        }
    }

    @Cron(CronExpression.EVERY_HOUR)
    public async removeExpiredTokens() {
        try {
            const result = await this.prisma.token.deleteMany({
                where: {
                    expiresIn: {
                        lte: new Date(),
                    },
                },
            });

            if (result.count > 0) {
                this.logger.log(`Удалено ${result.count} просроченных токенов`);
            }
        } catch (err) {
            this.logger.error(err);
        }
    }
}
