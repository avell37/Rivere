import {
    BadRequestException,
    ForbiddenException,
    NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { PrismaService } from '@/core/prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

describe('MessagesService', () => {
    let service: MessagesService;

    type MessageUpdateArgs = {
        where: { id: string };
        data: { deletedAt: Date };
    };

    const updateMock = jest.fn<
        Promise<Record<string, never>>,
        [MessageUpdateArgs]
    >();
    const findUniqueMock = jest.fn();

    const prisma = {
        message: {
            findUnique: findUniqueMock,
            update: updateMock,
            create: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessagesService,
                {
                    provide: PrismaService,
                    useValue: prisma,
                },
                {
                    provide: NotificationsService,
                    useValue: { createNotification: jest.fn() },
                },
            ],
        }).compile();

        service = module.get(MessagesService);
        jest.clearAllMocks();
    });

    describe('softDelete', () => {
        const messageId = 'message-1';
        const userId = 'user-1';
        const chatId = 'chat-1';

        it('soft deletes own message', async () => {
            findUniqueMock.mockResolvedValue({
                id: messageId,
                chatId,
                userId,
                deletedAt: null,
            });
            updateMock.mockResolvedValue({});

            const result = await service.softDelete(messageId, userId, chatId);

            expect(result.id).toBe(messageId);
            expect(result.chatId).toBe(chatId);
            expect(result.deletedAt).toBeInstanceOf(Date);
            expect(updateMock).toHaveBeenCalledTimes(1);

            const updateArgs = updateMock.mock.calls[0][0];

            expect(updateArgs.where).toEqual({ id: messageId });
            expect(updateArgs.data.deletedAt).toBeInstanceOf(Date);
        });

        it('throws when message not found', async () => {
            findUniqueMock.mockResolvedValue(null);

            await expect(
                service.softDelete(messageId, userId, chatId),
            ).rejects.toBeInstanceOf(NotFoundException);
        });

        it('throws when message belongs to another chat', async () => {
            findUniqueMock.mockResolvedValue({
                id: messageId,
                chatId: 'other-chat',
                userId,
                deletedAt: null,
            });

            await expect(
                service.softDelete(messageId, userId, chatId),
            ).rejects.toBeInstanceOf(BadRequestException);
        });

        it('throws when user is not the author', async () => {
            findUniqueMock.mockResolvedValue({
                id: messageId,
                chatId,
                userId: 'other-user',
                deletedAt: null,
            });

            await expect(
                service.softDelete(messageId, userId, chatId),
            ).rejects.toBeInstanceOf(ForbiddenException);
        });

        it('throws when message is already deleted', async () => {
            findUniqueMock.mockResolvedValue({
                id: messageId,
                chatId,
                userId,
                deletedAt: new Date(),
            });

            await expect(
                service.softDelete(messageId, userId, chatId),
            ).rejects.toBeInstanceOf(BadRequestException);
        });
    });
});
