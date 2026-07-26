import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/core/prisma/prisma.service';

export async function assertBoardActive(
    prisma: PrismaService,
    boardId: string,
) {
    const board = await prisma.board.findUnique({
        where: { id: boardId },
        select: { archivedAt: true },
    });

    if (!board) {
        throw new NotFoundException({
            code: 'errors.board.notFound',
            message: 'Доска не найдена',
        });
    }

    if (board.archivedAt) {
        throw new BadRequestException({
            code: 'errors.board.archived',
            message: 'Доска находится в архиве',
        });
    }
}
