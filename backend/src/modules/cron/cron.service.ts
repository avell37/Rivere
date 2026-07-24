import { PrismaService } from '@/core/prisma/prisma.service';
import { NotificationsService } from '@/modules/notifications/notifications.service';
import { NotificationMessageKey } from '@/modules/notifications/notification-message.keys';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { subDays } from 'date-fns';

@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);

    public constructor(
        private readonly prisma: PrismaService,
        private readonly notifications: NotificationsService,
    ) {}

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

    @Cron(CronExpression.EVERY_HOUR)
    public async notifyOverdueCards() {
        try {
            const now = new Date();

            const overdueCards = await this.prisma.card.findMany({
                where: {
                    deadline: { lte: now },
                    done: false,
                    deadlineNotifiedAt: null,
                },
                include: {
                    column: {
                        include: {
                            board: {
                                include: {
                                    members: {
                                        select: { userId: true },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            if (overdueCards.length === 0) return;

            for (const card of overdueCards) {
                const memberIds = card.column.board.members.map(
                    (m) => m.userId,
                );

                await Promise.all(
                    memberIds.map((userId) =>
                        this.notifications.createNotification(userId, {
                            type: 'deadline',
                            messageKey: NotificationMessageKey.DEADLINE,
                            messageParams: { cardTitle: card.title },
                            entityId: `${card.column.boardId}|${card.id}`,
                        }),
                    ),
                );

                await this.prisma.card.update({
                    where: { id: card.id },
                    data: { deadlineNotifiedAt: now },
                });
            }

            this.logger.log(
                `Отправлено уведомлений о просрочке для ${overdueCards.length} карточек`,
            );
        } catch (err) {
            this.logger.error('notifyOverdueCards error:', err);
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    public async remindEmailVerification() {
        try {
            const sevenDaysAgo = subDays(new Date(), 7);

            const users = await this.prisma.user.findMany({
                where: {
                    isEmailVerified: false,
                    OR: [
                        {
                            emailVerificationReminderAt: null,
                            createdAt: { lte: sevenDaysAgo },
                        },
                        {
                            emailVerificationReminderAt: {
                                lte: sevenDaysAgo,
                            },
                        },
                    ],
                },
                select: { id: true },
            });

            if (users.length === 0) return;

            const now = new Date();

            for (const user of users) {
                await this.notifications.createNotification(user.id, {
                    type: 'email_verification',
                    messageKey: NotificationMessageKey.EMAIL_VERIFICATION,
                });

                await this.prisma.user.update({
                    where: { id: user.id },
                    data: { emailVerificationReminderAt: now },
                });
            }

            this.logger.log(
                `Отправлено напоминаний о верификации почты: ${users.length}`,
            );
        } catch (err) {
            this.logger.error('remindEmailVerification error:', err);
        }
    }
}
