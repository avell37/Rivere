import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateCardInput } from './inputs/create-card.input';
import { checkBoardAccess } from 'src/shared/utils/check-board-access.util';
import { UpdateCardInput } from './inputs/update-card.input';
import { ChatService } from '../chat/chat.service';
import { ReorderCardInput } from './inputs/reorder-card.input';
import { ReorderToNewColumn } from './inputs/reorder-to-new-column.input';
import { StatisticsService } from '../statistics/statistics.service';
import { AchievementsService } from '../achievements/achievements.service';
import { CardGateway } from './card.gateway';

@Injectable()
export class CardService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly chat: ChatService,
        private readonly statistics: StatisticsService,
        private readonly achievements: AchievementsService,
        private readonly cardGateway: CardGateway,
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

        this.cardGateway.cardCreated(card.column.boardId, card);

        return card;
    }

    async update(userId: string, cardId: string, input: UpdateCardInput) {
        const card = await this.prisma.card.findUnique({
            where: { id: cardId },
            include: {
                column: true,
            },
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

        this.cardGateway.cardUpdated(card.column.boardId, updatedCard);

        if (!card.done && updatedCard.done) {
            await this.statistics.onCardCompleted(userId);
            await this.achievements.updateAchievementProgress(
                userId,
                'tenTasksCompleted',
                1,
            );
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
                data: { position: index },
            });
        });

        await this.prisma.$transaction(operations);

        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
        });

        if (column) {
            this.cardGateway.cardsReordered(column.boardId, {
                columnId,
                cards: cards.map((id, index) => ({
                    id,
                    position: index,
                })),
            });
        }

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

        const updatedCard = await this.prisma.card.update({
            where: { id: cardId },
            data: {
                columnId: newColumnId,
                position,
            },
        });

        this.cardGateway.cardMoved(card.column.boardId, {
            cardId,
            fromColumnId: card.columnId,
            toColumnId: newColumnId,
            position,
        });

        return updatedCard;
    }

    async delete(userId: string, cardId: string) {
        const card = await this.prisma.card.findUnique({
            where: { id: cardId },
            include: {
                column: true,
            },
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

        const deleted = await this.prisma.card.delete({
            where: { id: cardId },
        });

        this.cardGateway.cardDeleted(card.column.boardId, cardId);

        return deleted;
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
