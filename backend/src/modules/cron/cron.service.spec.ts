import { Test, TestingModule } from '@nestjs/testing';
import { CronService } from './cron.service';
import { PrismaService } from '@/core/prisma/prisma.service';
import { NotificationsService } from '@/modules/notifications/notifications.service';
import { NotificationMessageKey } from '@/modules/notifications/notification-message.keys';

describe('CronService', () => {
    let service: CronService;

    type CardUpdateArgs = {
        where: { id: string };
        data: { deadlineNotifiedAt: Date };
    };

    type UserUpdateManyArgs = {
        where: { bannedUntil: { not: null; lte: Date } };
        data: {
            bannedUntil: null;
            bannedAt: null;
            banReason: null;
        };
    };

    const cardUpdateMock = jest.fn<
        Promise<Record<string, never>>,
        [CardUpdateArgs]
    >();
    const userUpdateManyMock = jest.fn<
        Promise<{ count: number }>,
        [UserUpdateManyArgs]
    >();

    const prisma = {
        user: {
            updateMany: userUpdateManyMock,
            findMany: jest.fn(),
            update: jest.fn(),
        },
        boardInvite: {
            deleteMany: jest.fn(),
        },
        token: {
            deleteMany: jest.fn(),
        },
        card: {
            findMany: jest.fn(),
            update: cardUpdateMock,
        },
    };

    const notifications = {
        createNotification: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CronService,
                { provide: PrismaService, useValue: prisma },
                { provide: NotificationsService, useValue: notifications },
            ],
        }).compile();

        service = module.get(CronService);
        jest.clearAllMocks();
    });

    describe('notifyOverdueCards', () => {
        it('does nothing when there are no overdue cards', async () => {
            prisma.card.findMany.mockResolvedValue([]);

            await service.notifyOverdueCards();

            expect(notifications.createNotification).not.toHaveBeenCalled();
            expect(cardUpdateMock).not.toHaveBeenCalled();
        });

        it('notifies board members and marks card as notified', async () => {
            prisma.card.findMany.mockResolvedValue([
                {
                    id: 'card-1',
                    title: 'Overdue task',
                    column: {
                        boardId: 'board-1',
                        board: {
                            members: [
                                { userId: 'user-1' },
                                { userId: 'user-2' },
                            ],
                        },
                    },
                },
            ]);
            notifications.createNotification.mockResolvedValue(undefined);
            cardUpdateMock.mockResolvedValue({});

            await service.notifyOverdueCards();

            expect(notifications.createNotification).toHaveBeenCalledTimes(2);
            expect(notifications.createNotification).toHaveBeenCalledWith(
                'user-1',
                expect.objectContaining({
                    type: 'deadline',
                    messageKey: NotificationMessageKey.DEADLINE,
                    messageParams: { cardTitle: 'Overdue task' },
                    entityId: 'board-1|card-1',
                }),
            );
            const cardUpdateCall = cardUpdateMock.mock.calls[0][0];

            expect(cardUpdateCall).toMatchObject({
                where: { id: 'card-1' },
            });
            expect(cardUpdateCall.data.deadlineNotifiedAt).toBeInstanceOf(Date);
        });
    });

    describe('unbanUsers', () => {
        it('clears ban fields for expired bans', async () => {
            userUpdateManyMock.mockResolvedValue({ count: 2 });

            await service.unbanUsers();

            const unbanCall = userUpdateManyMock.mock.calls[0][0];

            expect(unbanCall).toMatchObject({
                data: {
                    bannedUntil: null,
                    bannedAt: null,
                    banReason: null,
                },
            });
            expect(unbanCall.where.bannedUntil.lte).toBeInstanceOf(Date);
        });
    });
});
