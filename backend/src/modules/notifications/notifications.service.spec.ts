import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { PrismaService } from '@/core/prisma/prisma.service';

describe('NotificationsService', () => {
    let service: NotificationsService;

    const prisma = {
        notification: {
            findMany: jest.fn(),
            count: jest.fn(),
        },
    };

    const gateway = {
        sendNotification: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                NotificationsService,
                { provide: PrismaService, useValue: prisma },
                { provide: NotificationsGateway, useValue: gateway },
            ],
        }).compile();

        service = module.get(NotificationsService);
        jest.clearAllMocks();
    });

    describe('getUserNotifications', () => {
        it('returns paginated notifications with unread count', async () => {
            prisma.notification.findMany.mockResolvedValue([
                { id: 'n1', read: false },
            ]);
            prisma.notification.count
                .mockResolvedValueOnce(25)
                .mockResolvedValueOnce(4);

            const result = await service.getUserNotifications('user-1', 20, 20);

            expect(prisma.notification.findMany).toHaveBeenCalledWith({
                where: { userId: 'user-1' },
                orderBy: { createdAt: 'desc' },
                take: 20,
                skip: 20,
            });
            expect(result).toEqual({
                items: [{ id: 'n1', read: false }],
                total: 25,
                unreadCount: 4,
            });
        });

        it('throws when user is missing', async () => {
            await expect(
                service.getUserNotifications(''),
            ).rejects.toBeInstanceOf(UnauthorizedException);
        });
    });
});
