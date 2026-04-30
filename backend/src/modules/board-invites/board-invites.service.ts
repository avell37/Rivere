import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { addDays } from 'date-fns';
import { NotificationsService } from '../notifications/notifications.service';
import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class BoardInvitesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly notificationsService: NotificationsService,
    ) {}

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

    async getInvite(token: string, userId: string) {
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

        const isMember = invite.board.members.some(
            (member) => member.userId === userId,
        );

        return {
            board: {
                id: invite.board.id,
                title: invite.board.title,
                membersCount: invite.board.members.length,
            },
            invitedBy: invite.creator,
            expiresAt: invite.expiresAt,
            isMember,
        };
    }

    async acceptInvite(userId: string, token: string) {
        const invite = await this.prisma.boardInvite.findUnique({
            where: { token },
            include: {
                creator: true,
                board: true,
            },
        });

        if (!invite) {
            throw new NotFoundException({
                code: 'errors.board.invite.notFound',
                message: 'Приглашение не найдено',
            });
        }

        if (invite.expiresAt < new Date()) {
            await this.prisma.boardInvite.delete({
                where: { id: invite.id },
            });

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

        const acceptedUser = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { nickname: true },
        });

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

        await this.prisma.userStats.update({
            where: { userId: invite.creator.id },
            data: {
                usersInvited: { increment: 1 },
            },
        });

        await this.notificationsService.createNotification(invite.creator.id, {
            type: 'board',
            message: `${acceptedUser?.nickname} принял приглашение в доску: ${invite.board.title}`,
            entityId: invite.boardId,
        });

        return true;
    }

    async declineInvite(userId: string, token: string) {
        const invite = await this.prisma.boardInvite.findUnique({
            where: { token },
            include: {
                board: true,
                creator: true,
            },
        });

        if (!invite) {
            throw new NotFoundException({
                code: 'errors.board.invite.notFound',
                message: 'Приглашение не найдено',
            });
        }

        if (invite.expiresAt < new Date()) {
            await this.prisma.boardInvite.delete({
                where: { id: invite.id },
            });

            throw new ForbiddenException({
                code: 'errors.board.invite.notValid',
                message: 'Приглашение истекло',
            });
        }

        const acceptedUser = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { nickname: true },
        });

        await this.prisma.boardInvite.delete({
            where: { id: invite.id },
        });

        await this.notificationsService.createNotification(invite.creator.id, {
            type: 'board',
            message: `${acceptedUser?.nickname} отклонил приглашение в доску: ${invite.board.title}`,
            entityId: invite.boardId,
        });

        return true;
    }
}
