import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateBoardInput } from './inputs/create-board.input';

import { AchievementsService } from '../achievements/achievements.service';
import { UpdateBoardInput } from './inputs/update-board.input';
import { checkBoardAccess } from 'src/shared/utils/check-board-access.util';
import { BoardGateway } from './board.gateway';

@Injectable()
export class BoardService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly achievementsService: AchievementsService,
        private readonly boardGateway: BoardGateway,
    ) {}

    async create(userId: string, input: CreateBoardInput) {
        const { title, background } = input;

        const isExistsBoard = await this.prisma.board.findFirst({
            where: {
                title,
                members: {
                    some: { userId },
                },
            },
            include: {
                members: {
                    where: { userId },
                },
            },
        });

        if (isExistsBoard) {
            throw new ConflictException({
                code: 'errors.board.exists',
                message: 'У вас уже есть доска с таким названием',
            });
        }

        const board = await this.prisma.board.create({
            data: {
                title,
                background: {
                    url: background?.url || null,
                    color: background?.color || null,
                },
                members: {
                    create: {
                        userId,
                        role: 'OWNER',
                    },
                },
            },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                email: true,
                                nickname: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
        });

        await this.achievementsService.updateAchievementProgress(
            userId,
            'firstBoard',
            1,
        );

        return board;
    }

    async getBoard(userId: string, boardId: string) {
        const board = await this.prisma.board.findUnique({
            where: {
                id: boardId,
            },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                email: true,
                                nickname: true,
                                avatar: true,
                            },
                        },
                    },
                },
                columns: {
                    orderBy: {
                        position: 'asc',
                    },
                    include: {
                        cards: {
                            orderBy: {
                                position: 'asc',
                            },
                            include: {
                                chat: {
                                    include: {
                                        _count: {
                                            select: {
                                                messages: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            boardId,
        });

        if (!board) {
            throw new NotFoundException({
                code: 'errors.board.notFound',
                message: 'Доска не найдена',
            });
        }

        const member = board.members.find((member) => member.userId === userId);

        return {
            ...board,
            isFavorite: member?.isFavorite ?? false,
        };
    }

    async getUserBoards(userId: string) {
        const boards = await this.prisma.board.findMany({
            where: {
                members: {
                    some: { userId },
                },
            },
            include: {
                members: {
                    select: {
                        userId: true,
                        isFavorite: true,
                        user: {
                            select: {
                                username: true,
                                email: true,
                                nickname: true,
                                avatar: true,
                            },
                        },
                    },
                },
                columns: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return boards.map((board) => {
            const currentUser = board.members.find(
                (member) => member.userId === userId,
            );

            return {
                ...board,
                isFavorite: currentUser?.isFavorite ?? false,
            };
        });
    }

    async updateBoard(
        userId: string,
        boardId: string,
        input: UpdateBoardInput,
    ) {
        const { title, background } = input;

        const board = await this.prisma.board.findUnique({
            where: { id: boardId },
        });

        if (!board) {
            throw new NotFoundException({
                code: 'errors.board.notFound',
                message: 'Доска не найдена',
            });
        }

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            boardId,
        });

        const updated = await this.prisma.board.update({
            where: { id: boardId },
            data: {
                title,
                background: {
                    url: background?.url || null,
                    color: background?.color || null,
                },
            },
        });

        this.boardGateway.boardEdited(boardId, updated);

        return updated;
    }

    async toggleFavorite(userId: string, boardId: string) {
        const member = await this.prisma.boardMember.findFirst({
            where: {
                userId,
                boardId,
            },
        });

        if (!member) {
            throw new NotFoundException({
                code: 'errors.board.members.notFound',
                message: 'Участник не найден',
            });
        }

        const updated = await this.prisma.boardMember.update({
            where: { id: member.id },
            data: { isFavorite: !member.isFavorite },
        });

        return updated;
    }

    async deleteBoard(userId: string, boardId: string) {
        const board = await this.prisma.board.findUnique({
            where: { id: boardId },
        });

        if (!board) {
            throw new NotFoundException({
                code: 'errors.board.notFound',
                message: 'Доска не найдена',
            });
        }

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            boardId,
        });

        await this.prisma.board.delete({
            where: { id: boardId },
        });

        this.boardGateway.boardDeleted(boardId, userId);

        return true;
    }
}
