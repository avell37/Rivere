import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColumnInput } from './inputs/create-column.input';
import { UpdateColumnInput } from './inputs/update-column.input';
import { ReorderColumnInput } from './inputs/reorder-column.input';
import { BoardGateway } from '../board/board.gateway';
import { PrismaService } from '@/core/prisma/prisma.service';
import { checkBoardPermission } from '@/shared/utils/board-permissions';
import { BoardPermission } from '@/shared/types/board-permissions.enum';

@Injectable()
export class ColumnService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly gateway: BoardGateway,
    ) {}

    async create(userId: string, input: CreateColumnInput) {
        const { boardId, title } = input;

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId,
            permission: BoardPermission.CREATE_COLUMN,
        });

        const count = await this.prisma.column.count({
            where: { boardId },
        });

        const column = await this.prisma.column.create({
            data: {
                boardId,
                title,
                position: count + 1,
            },
        });

        this.gateway.columnCreated(boardId, column);

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

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId: column.boardId,
            permission: BoardPermission.UPDATE_COLUMN,
        });

        const updated = await this.prisma.column.update({
            where: { id: columnId },
            data: {
                title,
            },
        });

        this.gateway.columnUpdated(column.boardId, updated);

        return updated;
    }

    async reorder(input: ReorderColumnInput) {
        const { boardId, columns } = input;

        const existingColumns = await this.prisma.column.findMany({
            where: {
                id: {
                    in: columns,
                },
                boardId,
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
            where: { boardId },
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

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId: column.boardId,
            permission: BoardPermission.DELETE_COLUMN,
        });

        await this.prisma.column.delete({
            where: { id: columnId },
        });

        this.gateway.columnDeleted(column.boardId, columnId);

        return {
            success: true,
            message: 'Колонка успешно удалена',
        };
    }
}
