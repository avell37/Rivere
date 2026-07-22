import { PrismaService } from '@/core/prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

export async function checkBoardAccess({
    prisma,
    userId,
    boardId,
    columnId,
    cardId,
    chatId,
}: {
    prisma: PrismaService;
    userId: string;
    boardId?: string;
    columnId?: string;
    cardId?: string;
    chatId?: string;
}) {
    let resolvedBoardId = boardId;

    if (!resolvedBoardId && chatId) {
        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
            select: {
                card: {
                    select: {
                        column: {
                            select: { boardId: true },
                        },
                    },
                },
            },
        });

        if (!chat?.card?.column) {
            throw new ForbiddenException({
                code: 'errors.chat.notFound',
                message: 'Чат не найден',
            });
        }

        resolvedBoardId = chat.card.column.boardId;
    }

    if (!resolvedBoardId && cardId) {
        const card = await prisma.card.findUnique({
            where: { id: cardId },
            select: {
                column: {
                    select: { boardId: true },
                },
            },
        });

        if (!card?.column) {
            throw new ForbiddenException({
                code: 'errors.card.notFound',
                message: 'Карточка не найдена',
            });
        }

        resolvedBoardId = card.column.boardId;
    }

    if (!resolvedBoardId && columnId) {
        const column = await prisma.column.findUnique({
            where: { id: columnId },
            select: { boardId: true },
        });

        if (!column)
            throw new ForbiddenException({
                code: 'errors.column.notFound',
                message: 'Колонка не найдена',
            });

        resolvedBoardId = column.boardId;
    }

    if (!resolvedBoardId) {
        throw new ForbiddenException({
            code: 'errors.column.noID',
            message: 'Не указан ID доски или колонки',
        });
    }

    const member = await prisma.boardMember.findFirst({
        where: {
            boardId: resolvedBoardId,
            userId,
        },
    });

    if (!member) {
        throw new ForbiddenException({
            code: 'errors.board.members.forbidden',
            message: 'Нет доступа к данной доске.',
        });
    }
}
