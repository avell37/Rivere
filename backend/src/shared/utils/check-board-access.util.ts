import { ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';

export async function checkBoardAccess({
    prisma,
    userId,
    boardId,
    columnId,
}: {
    prisma: PrismaService;
    userId: string;
    boardId?: string;
    columnId?: string;
}) {
    let resolvedBoardId = boardId;

    if (!resolvedBoardId && columnId) {
        const column = await prisma.column.findUnique({
            where: { id: columnId },
            select: { boardId: true },
        });

        if (!column) throw new ForbiddenException('Колонка не найдена');

        resolvedBoardId = column.boardId;
    }

    if (!resolvedBoardId) {
        throw new ForbiddenException('Не указан ID доски или колонки');
    }

    const member = await prisma.boardMember.findFirst({
        where: {
            boardId: resolvedBoardId,
            userId,
        },
    });

    if (!member) {
        throw new ForbiddenException('Нет доступа к данной доске.');
    }
}
