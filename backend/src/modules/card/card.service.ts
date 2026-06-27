import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardInput } from './inputs/create-card.input';
import { UpdateCardInput } from './inputs/update-card.input';
import { ChatService } from '../chat/chat.service';
import { ReorderCardInput } from './inputs/reorder-card.input';
import { ReorderToNewColumn } from './inputs/reorder-to-new-column.input';
import { StatisticsService } from '../statistics/statistics.service';
import { AchievementsService } from '../achievements/achievements.service';
import { BoardGateway } from '../board/board.gateway';
import { PrismaService } from '@/core/prisma/prisma.service';
import { checkBoardAccess } from '@/shared/utils/check-board-access.util';
import { checkBoardPermission } from '@/shared/utils/board-permissions';
import { BoardPermission } from '@/shared/types/board-permissions.enum';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Injectable()
export class CardService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly chat: ChatService,
        private readonly statistics: StatisticsService,
        private readonly achievements: AchievementsService,
        private readonly gateway: BoardGateway,
        private readonly activityLog: ActivityLogService,
    ) {}

    async create(userId: string, input: CreateCardInput) {
        const { columnId, title, description, priority, deadline } = input;

        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
        });

        if (!column) {
            throw new NotFoundException({
                code: 'errors.column.notFound',
                message: 'Колонка не найдена',
            });
        }

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId: column.boardId,
            permission: BoardPermission.CREATE_CARD,
        });

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

        await this.chat.createChat({ cardId: card.id });

        this.gateway.cardCreated(card.column.boardId, card);

        await this.activityLog.log({
            boardId: card.column.boardId,
            userId,
            action: 'CREATED',
            entityType: 'CARD',
            entityId: card.id,
            entityTitle: card.title,
        });

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

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId: card.column.boardId,
            permission: BoardPermission.UPDATE_CARD,
        });

        const updatedCard = await this.prisma.card.update({
            where: { id: cardId },
            data: input,
        });

        this.gateway.cardUpdated(card.column.boardId, updatedCard);

        if (!card.done && updatedCard.done) {
            await this.statistics.onCardCompleted(userId);
            await this.achievements.updateAchievementProgress(
                userId,
                'tenTasksCompleted',
                1,
            );
            await this.activityLog.log({
                boardId: card.column.boardId,
                userId,
                action: 'COMPLETED',
                entityType: 'CARD',
                entityId: card.id,
                entityTitle: updatedCard.title,
            });
        } else if (card.done && !updatedCard.done) {
            await this.activityLog.log({
                boardId: card.column.boardId,
                userId,
                action: 'REOPENED',
                entityType: 'CARD',
                entityId: card.id,
                entityTitle: updatedCard.title,
            });
        } else {
            await this.activityLog.log({
                boardId: card.column.boardId,
                userId,
                action: 'UPDATED',
                entityType: 'CARD',
                entityId: card.id,
                entityTitle: updatedCard.title,
            });
        }

        return updatedCard;
    }

    async reorder(userId: string, input: ReorderCardInput) {
        const { columnId, ids } = input;

        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
            include: {
                board: { select: { id: true } },
            },
        });

        if (!column) {
            throw new NotFoundException({
                code: 'column.notFound',
                message: 'Колонка не найдена',
            });
        }

        const cards = await this.prisma.card.findMany({
            where: { id: { in: ids } },
            include: { column: true },
        });

        if (cards.length !== ids.length) {
            throw new NotFoundException({
                code: 'card.notFound',
                message: 'Одна из карточек не найдена',
            });
        }

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            columnId,
        });

        await this.prisma.$transaction(
            ids.map((id, index) =>
                this.prisma.card.update({
                    where: { id },
                    data: { columnId, position: index },
                }),
            ),
        );

        const reordered = await this.prisma.card.findMany({
            where: { columnId },
            orderBy: { position: 'asc' },
        });

        this.gateway.cardsReordered(column.boardId, {
            columnId,
            cards: reordered,
        });

        return reordered;
    }

    async reorderToNewColumn(userId: string, input: ReorderToNewColumn) {
        const { cardId, newColumnId, position } = input;

        const card = await this.prisma.card.findUnique({
            where: { id: cardId },
            include: { column: true },
        });

        if (!card)
            throw new NotFoundException({
                code: 'card.notFound',
                message: 'Карточка не найдена',
            });

        const newColumn = await this.prisma.column.findUnique({
            where: { id: newColumnId },
        });

        if (!newColumn)
            throw new NotFoundException({
                code: 'column.notFound',
                message: 'Одна или несколько карточек не найдены',
            });

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            boardId: card.column.boardId,
        });

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            boardId: newColumn.boardId,
        });

        const cardsCount = await this.prisma.card.count({
            where: { columnId: newColumnId },
        });

        const safePosition = Math.max(0, Math.min(position, cardsCount));

        const updatedCard = await this.prisma.$transaction(async (prisma) => {
            await prisma.card.updateMany({
                where: {
                    columnId: card.columnId,
                    position: { gt: card.position },
                },
                data: { position: { decrement: 1 } },
            });

            await prisma.card.updateMany({
                where: {
                    columnId: newColumnId,
                    position: { gte: safePosition },
                },
                data: { position: { increment: 1 } },
            });

            return prisma.card.update({
                where: { id: cardId },
                data: {
                    columnId: newColumnId,
                    position: safePosition,
                },
            });
        });

        this.gateway.cardMoved(card.column.boardId, {
            cardId,
            fromColumnId: card.columnId,
            toColumnId: newColumnId,
            position: safePosition,
        });

        const [fromColumn, toColumn] = await Promise.all([
            this.prisma.column.findUnique({
                where: { id: card.columnId },
                select: { title: true },
            }),
            this.prisma.column.findUnique({
                where: { id: newColumnId },
                select: { title: true },
            }),
        ]);

        await this.activityLog.log({
            boardId: card.column.boardId,
            userId,
            action: 'MOVED',
            entityType: 'CARD',
            entityId: cardId,
            entityTitle: card.title,
            meta: {
                fromColumn: fromColumn?.title ?? card.columnId,
                toColumn: toColumn?.title ?? newColumnId,
            },
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

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId: card.column.boardId,
            permission: BoardPermission.DELETE_CARD,
        });

        await this.prisma.card.delete({
            where: { id: cardId },
        });

        this.gateway.cardDeleted(card.column.boardId, cardId);

        await this.activityLog.log({
            boardId: card.column.boardId,
            userId,
            action: 'DELETED',
            entityType: 'CARD',
            entityId: cardId,
            entityTitle: card.title,
        });

        return {
            success: true,
            message: 'Карточка успешно удалена',
        };
    }

    async getChatByCard(cardId: string) {
        return this.prisma.chat.findUnique({
            where: { cardId },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
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
