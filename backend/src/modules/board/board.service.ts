import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateBoardInput } from './inputs/create-board.input';

@Injectable()
export class BoardService {
    constructor(private readonly prisma: PrismaService) {}

    async create(userId: string, input: CreateBoardInput) {
        const { title } = input;

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
            throw new ConflictException(
                'У вас уже есть доска с таким названием',
            );
        }

        const board = await this.prisma.board.create({
            data: {
                title,
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
                                displayUsername: true,
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
                                id: true,
                                username: true,
                                email: true,
                                displayUsername: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
        });

        if (!board) {
            throw new NotFoundException('Доска не найдена');
        }

        const isMember = board.members.some(
            (member) => member.userId === userId,
        );

        if (!isMember) {
            throw new ForbiddenException('Отказано в доступе');
        }

        return board;
    }

    async getUserBoards() {}

    async updateBoard() {}

    async deleteBoard() {}
}
