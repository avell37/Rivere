import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class MessagesService {
    constructor(private readonly prisma: PrismaService) {}

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
