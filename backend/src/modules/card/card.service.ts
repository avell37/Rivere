import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateCardInput } from './inputs/create-card.input';
import { checkBoardAccess } from 'src/shared/utils/check-board-access.util';
import { UpdateCardInput } from './inputs/update-card.input';
import { ChatService } from '../chat/chat.service';
import { ReorderCardInput } from './inputs/reorder-card.input';
import { ReorderToNewColumn } from './inputs/reorder-to-new-column.input';
import { StatisticsService } from '../statistics/statistics.service';

@Injectable()
export class CardService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly chat: ChatService,
        private readonly statistics: StatisticsService,
    ) {}

    async create(userId: string, input: CreateCardInput) {
        const { columnId, title, description, priority, deadline } = input;

        await checkBoardAccess({ prisma: this.prisma, userId, columnId });

        const lastCard = await this.prisma.card.findFirst({
            where: { columnId },
            orderBy: { position: 'desc' },
        });

        const card = await this.prisma.card.create({
            data: {
                columnId,
                title,
                description,
                priority,
                deadline,
                position: lastCard ? lastCard.position + 1 : 0,
                done: false,
            },
            include: {
                column: true,
            },
        });

        const chat = await this.chat.createChat({ cardId: card.id });

        return card;
    }

    async update(userId: string, cardId: string, input: UpdateCardInput) {
        const card = await this.prisma.card.findUnique({
            where: { id: cardId },
        });

        if (!card)
            throw new NotFoundException({
                code: 'card.notFound',
                message: 'Карточка не найдена',
            });

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            columnId: card.columnId,
        });

        const updatedCard = await this.prisma.card.update({
            where: { id: cardId },
            data: input,
        });

        if (!card.done && updatedCard.done) {
            await this.statistics.onCardCompleted(userId);
        }

        return updatedCard;
    }

    async reorder(userId: string, input: ReorderCardInput) {
        const { columnId, cards } = input;

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            columnId,
        });

        const existingCards = await this.prisma.card.findMany({
            where: {
                id: {
                    in: cards,
                },
                columnId,
            },
            select: {
                id: true,
            },
        });

        if (existingCards.length !== cards.length) {
            throw new NotFoundException({
                code: 'card.notFoundMultiple',
                message: 'Одна или несколько карточек не найдены',
            });
        }

        const operations = cards.map((id, index) => {
            return this.prisma.card.update({
                where: { id },
                data: { position: index + 1 },
            });
        });

        await this.prisma.$transaction(operations);

        return this.prisma.card.findMany({
            where: { columnId },
            orderBy: { position: 'asc' },
        });
    }

    async reorderToNewColumn(userId: string, input: ReorderToNewColumn) {
        const { cardId, newColumnId, position } = input;

        const card = await this.prisma.card.findUnique({
            where: { id: cardId },
            include: { column: true },
        });

        if (!card) {
            throw new NotFoundException({
                code: 'card.notFound',
                message: 'Карточка не найдена',
            });
        }

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            boardId: card.column.boardId,
        });

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            columnId: newColumnId,
        });

        await this.prisma.card.updateMany({
            where: {
                columnId: card.columnId,
                position: { gt: card.position },
            },
            data: {
                position: { decrement: 1 },
            },
        });

        await this.prisma.card.updateMany({
            where: {
                columnId: newColumnId,
                position: { gte: position },
            },
            data: {
                position: { increment: 1 },
            },
        });

        return this.prisma.card.update({
            where: { id: cardId },
            data: {
                columnId: newColumnId,
                position: position,
            },
        });
    }

    async delete(userId: string, cardId: string) {
        const card = await this.prisma.card.findUnique({
            where: { id: cardId },
        });

        if (!card)
            throw new NotFoundException({
                code: 'card.notFound',
                message: 'Карточка не найдена',
            });

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            columnId: card.columnId,
        });

        return this.prisma.card.delete({
            where: { id: cardId },
        });
    }

    async getChatByCard(cardId: string) {
        return this.prisma.chat.findUnique({
            where: { cardId },
            include: {
                messages: {
                    include: {
                        user: {
                            select: {
                                nickname: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
        });
    }
}
