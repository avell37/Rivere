import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateColumnInput } from './inputs/create-column.input';
import { UpdateColumnInput } from './inputs/update-column.input';
import { ReorderColumnInput } from './inputs/reorder-column.input';
import { BoardGateway } from '../board/board.gateway';
import { PrismaService } from '@/core/prisma/prisma.service';
import { checkBoardPermission } from '@/shared/utils/board-permissions';
import { BoardPermission } from '@/shared/types/board-permissions.enum';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { AchievementsService } from '../achievements/achievements.service';
import { CardAttachmentService } from '../card/card-attachment.service';
import { assertBoardActive } from '@/shared/utils/assert-board-active.util';
import { checkBoardAccess } from '@/shared/utils/check-board-access.util';

@Injectable()
export class ColumnService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly gateway: BoardGateway,
        private readonly activityLog: ActivityLogService,
        private readonly achievements: AchievementsService,
        private readonly attachments: CardAttachmentService,
    ) {}

    async create(userId: string, input: CreateColumnInput) {
        const { boardId, title } = input;

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId,
            permission: BoardPermission.CREATE_COLUMN,
        });

        await assertBoardActive(this.prisma, boardId);

        const count = await this.prisma.column.count({
            where: { boardId, archivedAt: null },
        });

        const column = await this.prisma.column.create({
            data: {
                boardId,
                title,
                position: count + 1,
            },
        });

        this.gateway.columnCreated(boardId, column);

        await this.activityLog.log({
            boardId,
            userId,
            action: 'CREATED',
            entityType: 'COLUMN',
            entityId: column.id,
            entityTitle: column.title,
        });

        await this.achievements.updateAchievementProgress(
            userId,
            'firstColumn',
            1,
        );
        await this.achievements.updateAchievementProgress(
            userId,
            'organizer',
            1,
        );

        return column;
    }

    async update(userId: string, columnId: string, input: UpdateColumnInput) {
        const { title } = input;
        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
        });

        if (!column)
            throw new NotFoundException({
                code: 'errors.column.notFound',
                message: 'Колонка не найдена',
            });

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
            permission: BoardPermission.UPDATE_COLUMN,
        });

        await assertBoardActive(this.prisma, column.boardId);

        const updated = await this.prisma.column.update({
            where: { id: columnId },
            data: {
                title,
            },
        });

        this.gateway.columnUpdated(column.boardId, updated);

        await this.activityLog.log({
            boardId: column.boardId,
            userId,
            action: 'UPDATED',
            entityType: 'COLUMN',
            entityId: column.id,
            entityTitle: updated.title,
        });

        return updated;
    }

    async reorder(userId: string, input: ReorderColumnInput) {
        const { boardId, columns } = input;

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            boardId,
        });

        await assertBoardActive(this.prisma, boardId);

        const existingColumns = await this.prisma.column.findMany({
            where: {
                id: {
                    in: columns,
                },
                boardId,
                archivedAt: null,
            },
            select: {
                id: true,
            },
        });

        if (existingColumns.length !== columns.length) {
            throw new NotFoundException({
                code: 'errors.column.notFoundMultiple',
                message: 'Одна или несколько колонок не найдены',
            });
        }

        const operations = columns.map((id, index) => {
            return this.prisma.column.update({
                where: { id },
                data: { position: index + 1 },
            });
        });

        await this.prisma.$transaction(operations);

        const reordered = await this.prisma.column.findMany({
            where: { boardId, archivedAt: null },
            orderBy: { position: 'asc' },
        });

        this.gateway.columnsReordered(boardId, reordered);

        return reordered;
    }

    async delete(userId: string, columnId: string) {
        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
        });

        if (!column)
            throw new NotFoundException({
                code: 'errors.column.notFound',
                message: 'Колонка не найдена',
            });

        if (column.archivedAt) {
            throw new BadRequestException({
                code: 'errors.column.alreadyArchived',
                message: 'Колонка уже в архиве',
            });
        }

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId: column.boardId,
            permission: BoardPermission.DELETE_COLUMN,
        });

        await assertBoardActive(this.prisma, column.boardId);

        const archivedAt = new Date();

        await this.prisma.$transaction([
            this.prisma.column.update({
                where: { id: columnId },
                data: { archivedAt },
            }),
            this.prisma.card.updateMany({
                where: { columnId, archivedAt: null },
                data: { archivedAt },
            }),
        ]);

        this.gateway.columnArchived(column.boardId, columnId);

        await this.activityLog.log({
            boardId: column.boardId,
            userId,
            action: 'ARCHIVED',
            entityType: 'COLUMN',
            entityId: columnId,
            entityTitle: column.title,
        });

        return {
            success: true,
            message: 'Колонка перенесена в архив',
        };
    }

    async restore(userId: string, columnId: string) {
        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
        });

        if (!column)
            throw new NotFoundException({
                code: 'errors.column.notFound',
                message: 'Колонка не найдена',
            });

        if (!column.archivedAt) {
            throw new BadRequestException({
                code: 'errors.column.notArchived',
                message: 'Колонка не находится в архиве',
            });
        }

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId: column.boardId,
            permission: BoardPermission.DELETE_COLUMN,
        });

        await assertBoardActive(this.prisma, column.boardId);

        const lastColumn = await this.prisma.column.findFirst({
            where: { boardId: column.boardId, archivedAt: null },
            orderBy: { position: 'desc' },
        });

        const restored = await this.prisma.column.update({
            where: { id: columnId },
            data: {
                archivedAt: null,
                position: lastColumn ? lastColumn.position + 1 : 0,
            },
        });

        this.gateway.columnRestored(column.boardId, restored);

        await this.activityLog.log({
            boardId: column.boardId,
            userId,
            action: 'RESTORED',
            entityType: 'COLUMN',
            entityId: columnId,
            entityTitle: column.title,
        });

        return restored;
    }

    async permanentDelete(userId: string, columnId: string) {
        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
        });

        if (!column)
            throw new NotFoundException({
                code: 'errors.column.notFound',
                message: 'Колонка не найдена',
            });

        if (!column.archivedAt) {
            throw new BadRequestException({
                code: 'errors.column.notArchived',
                message: 'Колонку можно удалить только из архива',
            });
        }

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId: column.boardId,
            permission: BoardPermission.DELETE_COLUMN,
        });

        await this.attachments.deleteAllForColumn(columnId);

        await this.prisma.column.delete({
            where: { id: columnId },
        });

        this.gateway.columnPermanentDeleted(column.boardId, columnId);

        await this.activityLog.log({
            boardId: column.boardId,
            userId,
            action: 'DELETED',
            entityType: 'COLUMN',
            entityId: columnId,
            entityTitle: column.title,
        });

        return {
            success: true,
            message: 'Колонка удалена навсегда',
        };
    }
}
