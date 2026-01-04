import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateBoardInput } from './inputs/create-board.input';
import { randomBytes } from 'crypto';
import { addDays } from 'date-fns';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BoardService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
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
                    include: {
                        cards: true,
                    },
                },
            },
        });

        if (!board) {
            throw new NotFoundException({
                code: 'errors.board.notFound',
                message: 'Доска не найдена',
            });
        }

        return board;
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
                columns: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return boards;
    }

    async updateBoard(boardId: string) {}

    async deleteBoard(boardId: string) {
        await this.prisma.board.delete({
            where: { id: boardId },
        });

        return true;
    }

    async createInvite(userId: string, boardId: string) {
        const boardMember = await this.prisma.boardMember.findFirst({
            where: { boardId, userId },
        });

        if (!boardMember) {
            throw new ForbiddenException({
                code: 'errors.board.invite.notMember',
                message: 'Вы не являетесь участником этой доски',
            });
        }

        const token = randomBytes(16).toString('hex');
        const invite = await this.prisma.boardInvite.create({
            data: {
                token,
                boardId,
                createdBy: userId,
                expiresAt: addDays(new Date(), 1),
            },
        });

        return {
            link: `${this.config.getOrThrow<string>('ALLOWED_ORIGIN')}/invite/${invite.token}`,
            expiresAt: invite.expiresAt,
        };
    }

    async getInvite(token: string) {
        const invite = await this.prisma.boardInvite.findUnique({
            where: { token },
            include: {
                board: {
                    select: {
                        id: true,
                        title: true,
                        members: true,
                    },
                },
                creator: {
                    select: {
                        id: true,
                        nickname: true,
                        avatar: true,
                    },
                },
            },
        });

        if (!invite) {
            throw new NotFoundException({
                code: 'errors.board.invite.notFound',
                message: 'Приглашение не найдено',
            });
        }

        if (invite.expiresAt < new Date()) {
            await this.prisma.boardInvite.deleteMany({
                where: { token },
            });
            throw new ForbiddenException({
                code: 'errors.board.invite.notValid',
                message: 'Приглашение истекло',
            });
        }

        return {
            board: {
                id: invite.board.id,
                title: invite.board.title,
                membersCount: invite.board.members.length,
            },
            invitedBy: invite.creator,
            expiresAt: invite.expiresAt,
        };
    }

    async acceptInvite(userId: string, token: string) {
        const invite = await this.prisma.boardInvite.findUnique({
            where: { token },
        });

        if (!invite) {
            throw new NotFoundException({
                code: 'errors.board.invite.notFound',
                message: 'Приглашение не найдено',
            });
        }
        if (invite.expiresAt < new Date()) {
            throw new ForbiddenException({
                code: 'errors.board.invite.notValid',
                message: 'Приглашение истекло',
            });
        }

        const isAlreadyMember = await this.prisma.boardMember.findFirst({
            where: {
                boardId: invite.boardId,
                userId,
            },
        });

        if (isAlreadyMember) {
            throw new ConflictException({
                code: 'errors.board.invite.alreadyMember',
                message: 'Вы уже являетесь участником этой доски',
            });
        }

        await this.prisma.$transaction([
            this.prisma.boardMember.create({
                data: {
                    userId,
                    boardId: invite.boardId,
                    role: 'MEMBER',
                },
            }),
            this.prisma.boardInvite.deleteMany({
                where: { id: invite.id },
            }),
        ]);

        return true;
    }
}
