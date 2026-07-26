import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from '@/core/prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationMessageKey } from '../notifications/notification-message.keys';
import { extractMentionUsernames } from '@/shared/utils/parse-mentions.util';
import { MessageWithBoard } from './types/messages.types';

@Injectable()
export class MessagesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly notifications: NotificationsService,
    ) {}

    async create(userId: string, dto: CreateMessageDto) {
        const { chatId, text } = dto;

        if (!chatId || !text) {
            throw new BadRequestException({
                code: 'errors.messages.missingFields',
                message: 'Переданы не все данные.',
            });
        }

        return this.prisma.message.create({
            data: {
                chatId,
                userId,
                text,
            },
            include: {
                user: true,
                chat: {
                    include: {
                        card: {
                            include: {
                                column: {
                                    include: {
                                        board: {
                                            include: {
                                                members: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    async notifyMentions(authorId: string, message: MessageWithBoard) {
        const board = message.chat?.card?.column?.board;
        const card = message.chat?.card;

        if (!board || !card) return;

        const usernames = extractMentionUsernames(message.text);
        if (!usernames.length) return;

        const memberIds = new Set(board.members.map((member) => member.userId));

        const mentionedUsers = await this.prisma.user.findMany({
            where: {
                username: { in: usernames, mode: 'insensitive' },
            },
            select: { id: true },
        });

        await Promise.all(
            mentionedUsers
                .filter(
                    (user) => user.id !== authorId && memberIds.has(user.id),
                )
                .map((user) =>
                    this.notifications.createNotification(user.id, {
                        type: 'mention',
                        messageKey: NotificationMessageKey.MENTION,
                        messageParams: {
                            authorNickname: message.user.nickname,
                            cardTitle: card.title,
                        },
                        entityId: `${board.id}|${card.id}`,
                    }),
                ),
        );
    }

    async softDelete(messageId: string, userId: string, chatId: string) {
        const message = await this.prisma.message.findUnique({
            where: { id: messageId },
            select: {
                id: true,
                chatId: true,
                userId: true,
                deletedAt: true,
            },
        });

        if (!message) {
            throw new NotFoundException({
                code: 'errors.messages.notFound',
                message: 'Сообщение не найдено',
            });
        }

        if (message.chatId !== chatId) {
            throw new BadRequestException({
                code: 'errors.messages.invalidChat',
                message: 'Сообщение не принадлежит этому чату',
            });
        }

        if (message.userId !== userId) {
            throw new ForbiddenException({
                code: 'errors.messages.forbidden',
                message: 'Нельзя удалить чужое сообщение',
            });
        }

        if (message.deletedAt) {
            throw new BadRequestException({
                code: 'errors.messages.alreadyDeleted',
                message: 'Сообщение уже удалено',
            });
        }

        const deletedAt = new Date();

        await this.prisma.message.update({
            where: { id: messageId },
            data: { deletedAt },
        });

        return {
            id: message.id,
            chatId: message.chatId,
            deletedAt,
        };
    }
}
