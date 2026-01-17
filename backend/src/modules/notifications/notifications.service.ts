import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly gateway: NotificationsGateway,
        private readonly prisma: PrismaService,
    ) {}

    async createNotification(
        userId: string,
        payload: {
            type: string;
            message: string;
            entityId?: string;
        },
    ) {
        if (!userId) {
            throw new UnauthorizedException({
                code: 'errors.unauthorized',
                message: 'Вы не авторизованы',
            });
        }

        const notification = await this.prisma.notification.create({
            data: {
                userId,
                type: payload.type,
                message: payload.message,
                entityId: payload.entityId || null,
            },
        });

        this.gateway.sendNotification(userId, notification);

        return notification;
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
        return { success: true };
    }

    async clearNotifications(userId: string) {
        await this.prisma.notification.deleteMany({
            where: { userId },
        });
        return { success: true };
    }
}
