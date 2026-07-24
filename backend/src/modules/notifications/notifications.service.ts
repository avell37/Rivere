import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { PrismaService } from '@/core/prisma/prisma.service';
import { CreateNotificationPayload } from './notification.types';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly gateway: NotificationsGateway,
        private readonly prisma: PrismaService,
    ) {}

    async createNotification(
        userId: string,
        payload: CreateNotificationPayload,
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
                messageKey: payload.messageKey,
                messageParams: payload.messageParams ?? undefined,
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

        return {
            success: true,
            message: 'Уведомления прочитаны',
        };
    }

    async readNotification(userId: string, notificationId: string) {
        const notification = await this.prisma.notification.findFirst({
            where: {
                id: notificationId,
                userId,
            },
        });

        if (!notification) {
            throw new NotFoundException({
                code: 'errors.notifications.notFound',
                message: 'Уведомление не найдено',
            });
        }

        await this.prisma.notification.update({
            where: { id: notificationId },
            data: { read: true },
        });

        return {
            success: true,
            message: 'Уведомление прочитано',
        };
    }

    async clearNotifications(userId: string) {
        await this.prisma.notification.deleteMany({
            where: { userId },
        });

        return {
            success: true,
            message: 'Уведомления удалены',
        };
    }
}
