import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateCardInput } from './inputs/create-card.input';
import { UpdateCardInput } from './inputs/update-card.input';
import { ChatService } from '../chat/chat.service';
import { ReorderCardInput } from './inputs/reorder-card.input';
import { ReorderToNewColumn } from './inputs/reorder-to-new-column.input';
import { StatisticsService } from '../statistics/statistics.service';
import { AchievementsService } from '../achievements/achievements.service';
import { BoardGateway } from '../board/board.gateway';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationMessageKey } from '../notifications/notification-message.keys';
import { PrismaService } from '@/core/prisma/prisma.service';
import { checkBoardAccess } from '@/shared/utils/check-board-access.util';
import { checkBoardPermission } from '@/shared/utils/board-permissions';
import { BoardPermission } from '@/shared/types/board-permissions.enum';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { cardRelationsInclude } from './card.include';
import { CardAttachmentService } from './card-attachment.service';
import { assertBoardActive } from '@/shared/utils/assert-board-active.util';

@Injectable()
export class CardService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly chat: ChatService,
        private readonly statistics: StatisticsService,
        private readonly achievements: AchievementsService,
        private readonly gateway: BoardGateway,
        private readonly activityLog: ActivityLogService,
        private readonly notifications: NotificationsService,
        private readonly attachments: CardAttachmentService,
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

        if (column.archivedAt) {
            throw new BadRequestException({
                code: 'errors.column.archived',
                message: 'Колонка находится в архиве',
            });
        }

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId: column.boardId,
            permission: BoardPermission.CREATE_CARD,
        });

        await assertBoardActive(this.prisma, column.boardId);

        const lastCard = await this.prisma.card.findFirst({
            where: { columnId, archivedAt: null },
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
                ...cardRelationsInclude,
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

        await this.achievements.updateAchievementProgress(
            userId,
            'firstCard',
            1,
        );

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

        if (card.archivedAt) {
            throw new NotFoundException({
                code: 'errors.card.archived',
                message: 'Карточка находится в архиве',
            });
        }

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId: card.column.boardId,
            permission: BoardPermission.UPDATE_CARD,
        });

        await assertBoardActive(this.prisma, card.column.boardId);

        const { tags, ...cardData } = input;

        const updatedCard = await this.prisma.$transaction(async (tx) => {
            if (tags !== undefined) {
                await tx.tag.deleteMany({ where: { cardId } });

                if (tags.length > 0) {
                    await tx.tag.createMany({
                        data: tags.map((tag) => ({
                            title: tag.title,
                            background: tag.background,
                            cardId,
                        })),
                    });
                }
            }

            return tx.card.update({
                where: { id: cardId },
                data: {
                    ...cardData,
                    ...(cardData.deadline !== undefined && {
                        deadlineNotifiedAt: null,
                    }),
                },
                include: cardRelationsInclude,
            });
        });

        this.gateway.cardUpdated(card.column.boardId, updatedCard);

        const assigneeChanged =
            input.assigneeId !== undefined &&
            input.assigneeId !== card.assigneeId;
        if (
            assigneeChanged &&
            input.assigneeId &&
            input.assigneeId !== userId
        ) {
            await this.notifications.createNotification(input.assigneeId, {
                type: 'assignment',
                messageKey: NotificationMessageKey.ASSIGNMENT,
                messageParams: { cardTitle: updatedCard.title },
                entityId: `${card.column.boardId}|${card.id}`,
            });
        }

        if (!card.done && updatedCard.done) {
            await this.statistics.onCardCompleted(userId);
            await this.achievements.updateAchievementProgress(
                userId,
                'tenTasksCompleted',
                1,
            );
            await this.achievements.updateAchievementProgress(
                userId,
                'fiftyTasksCompleted',
                1,
            );
            await this.achievements.updateAchievementProgress(
                userId,
                'hundredTasksCompleted',
                1,
            );
            await this.achievements.updateAchievementProgress(
                userId,
                'fiveHundredTasksCompleted',
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

        if (column.archivedAt) {
            throw new BadRequestException({
                code: 'errors.column.archived',
                message: 'Колонка находится в архиве',
            });
        }

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            columnId,
        });

        await assertBoardActive(this.prisma, column.board.id);

        const activeCards = await this.prisma.card.findMany({
            where: { columnId, archivedAt: null },
            select: { id: true },
        });

        if (activeCards.length !== ids.length) {
            throw new BadRequestException({
                code: 'errors.card.reorderIncomplete',
                message: 'Список карточек для сортировки неполный',
            });
        }

        const activeIds = new Set(activeCards.map((item) => item.id));

        if (ids.some((id) => !activeIds.has(id))) {
            throw new BadRequestException({
                code: 'errors.card.reorderInvalid',
                message: 'Одна или несколько карточек не принадлежат колонке',
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

        if (cards.some((item) => item.archivedAt)) {
            throw new NotFoundException({
                code: 'errors.card.archived',
                message: 'Карточка находится в архиве',
            });
        }

        if (cards.some((item) => item.columnId !== columnId)) {
            throw new BadRequestException({
                code: 'errors.card.reorderInvalid',
                message: 'Одна или несколько карточек не принадлежат колонке',
            });
        }

        await this.prisma.$transaction(
            ids.map((id, index) =>
                this.prisma.card.update({
                    where: { id },
                    data: { columnId, position: index },
                }),
            ),
        );

        const reordered = await this.prisma.card.findMany({
            where: { columnId, archivedAt: null },
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

        if (card.archivedAt) {
            throw new NotFoundException({
                code: 'errors.card.archived',
                message: 'Карточка находится в архиве',
            });
        }

        const newColumn = await this.prisma.column.findUnique({
            where: { id: newColumnId },
        });

        if (!newColumn)
            throw new NotFoundException({
                code: 'column.notFound',
                message: 'Одна или несколько карточек не найдены',
            });

        if (newColumn.archivedAt) {
            throw new BadRequestException({
                code: 'errors.column.archived',
                message: 'Колонка находится в архиве',
            });
        }

        if (card.column.boardId !== newColumn.boardId) {
            throw new BadRequestException({
                code: 'errors.card.moveForbidden',
                message: 'Нельзя перемещать карточку между досками',
            });
        }

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            boardId: card.column.boardId,
        });

        await assertBoardActive(this.prisma, card.column.boardId);

        const cardsCount = await this.prisma.card.count({
            where: { columnId: newColumnId, archivedAt: null },
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

        if (card.archivedAt) {
            throw new BadRequestException({
                code: 'errors.card.alreadyArchived',
                message: 'Карточка уже в архиве',
            });
        }

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId: card.column.boardId,
            permission: BoardPermission.DELETE_CARD,
        });

        await assertBoardActive(this.prisma, card.column.boardId);

        await this.prisma.card.update({
            where: { id: cardId },
            data: { archivedAt: new Date() },
        });

        this.gateway.cardArchived(card.column.boardId, cardId);

        await this.activityLog.log({
            boardId: card.column.boardId,
            userId,
            action: 'ARCHIVED',
            entityType: 'CARD',
            entityId: cardId,
            entityTitle: card.title,
        });

        return {
            success: true,
            message: 'Карточка перенесена в архив',
        };
    }

    async restore(userId: string, cardId: string) {
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

        if (!card.archivedAt) {
            throw new BadRequestException({
                code: 'errors.card.notArchived',
                message: 'Карточка не находится в архиве',
            });
        }

        if (card.column.archivedAt) {
            throw new BadRequestException({
                code: 'errors.column.archived',
                message: 'Колонка находится в архиве',
            });
        }

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId: card.column.boardId,
            permission: BoardPermission.DELETE_CARD,
        });

        await assertBoardActive(this.prisma, card.column.boardId);

        const lastCard = await this.prisma.card.findFirst({
            where: { columnId: card.columnId, archivedAt: null },
            orderBy: { position: 'desc' },
        });

        const restored = await this.prisma.card.update({
            where: { id: cardId },
            data: {
                archivedAt: null,
                position: lastCard ? lastCard.position + 1 : 0,
            },
            include: {
                column: true,
                ...cardRelationsInclude,
            },
        });

        this.gateway.cardRestored(card.column.boardId, restored);

        await this.activityLog.log({
            boardId: card.column.boardId,
            userId,
            action: 'RESTORED',
            entityType: 'CARD',
            entityId: cardId,
            entityTitle: card.title,
        });

        return restored;
    }

    async permanentDelete(userId: string, cardId: string) {
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

        if (!card.archivedAt) {
            throw new BadRequestException({
                code: 'errors.card.notArchived',
                message: 'Карточку можно удалить только из архива',
            });
        }

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId: card.column.boardId,
            permission: BoardPermission.DELETE_CARD,
        });

        await this.attachments.deleteAllForCard(cardId);

        await this.prisma.card.delete({
            where: { id: cardId },
        });

        this.gateway.cardPermanentDeleted(card.column.boardId, cardId);

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
            message: 'Карточка удалена навсегда',
        };
    }

    async getChatByCard(userId: string, cardId: string) {
        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            cardId,
        });

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
