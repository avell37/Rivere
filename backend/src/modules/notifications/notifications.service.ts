import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly gateway: NotificationsGateway,
        private readonly prisma: PrismaService,
    ) {}

    async send(userId: string, notification: any) {
        this.gateway.sendNotification(userId, notification);
    }

    async getUserNotifications(userId: string) {
        if (!userId) {
            throw new UnauthorizedException({
                code: 'errors.notifications.unauthorized',
                message: 'Вы не авторизованы',
            });
        }

        return this.prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async readAllNotifications(userId: string) {
        await this.prisma.notification.updateMany({
            where: { userId },
            data: { read: true },
        });
    }

    async clearNotifications(userId: string) {
        await this.prisma.notification.deleteMany({
            where: { userId },
        });
        return { success: true };
    }
}
