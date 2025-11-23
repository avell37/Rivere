import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateColumnInput } from './inputs/create-column.input';
import { UpdateColumnInput } from './inputs/update-column.input';
import { checkBoardAccess } from 'src/shared/utils/check-board-access.util';

@Injectable()
export class ColumnService {
    constructor(private readonly prisma: PrismaService) {}

    async create(userId: string, input: CreateColumnInput) {
        const { boardId, title } = input;

        await checkBoardAccess({ prisma: this.prisma, userId, boardId });

        const count = await this.prisma.column.count({
            where: { boardId },
        });

        return this.prisma.column.create({
            data: {
                boardId,
                title,
                position: count + 1,
            },
        });
    }

    async update(userId: string, columnId: string, input: UpdateColumnInput) {
        const { title } = input;
        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
        });

        if (!column) throw new NotFoundException('Колонка не найдена');

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            boardId: column.boardId,
        });

        return this.prisma.column.update({
            where: { id: columnId },
            data: {
                title,
            },
        });
    }

    async delete(userId: string, columnId: string) {
        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
        });

        if (!column) throw new NotFoundException('Колонка не найдена');

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            boardId: column.boardId,
        });

        return this.prisma.column.delete({
            where: { id: columnId },
        });
    }
}
