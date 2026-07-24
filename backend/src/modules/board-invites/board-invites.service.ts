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
import { NotificationMessageKey } from '../notifications/notification-message.keys';
import { PrismaService } from '@/core/prisma/prisma.service';
import { checkBoardPermission } from '@/shared/utils/board-permissions';
import { BoardPermission } from '@/shared/types/board-permissions.enum';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { AchievementsService } from '../achievements/achievements.service';

@Injectable()
export class BoardInvitesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly notificationsService: NotificationsService,
        private readonly activityLog: ActivityLogService,
        private readonly achievements: AchievementsService,
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

        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId,
            permission: BoardPermission.INVITE_USERS,
        });

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

    async searchUsers(userId: string, boardId: string, query: string) {
        await checkBoardPermission({
            prisma: this.prisma,
            userId,
            boardId,
            permission: BoardPermission.INVITE_USERS,
        });

        const trimmedQuery = query.trim();

        if (trimmedQuery.length < 2) {
            return { users: [] };
        }

        const members = await this.prisma.boardMember.findMany({
            where: { boardId },
            select: { userId: true },
        });

        const excludedIds = [...members.map((member) => member.userId), userId];

        const users = await this.prisma.user.findMany({
            where: {
                id: { notIn: excludedIds },
                OR: [
                    {
                        email: {
                            contains: trimmedQuery,
                            mode: 'insensitive',
                        },
                    },
                    {
                        username: {
                            contains: trimmedQuery,
                            mode: 'insensitive',
                        },
                    },
                    {
                        nickname: {
                            contains: trimmedQuery,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            take: 10,
            orderBy: { username: 'asc' },
            select: {
                id: true,
                username: true,
                nickname: true,
                avatar: true,
            },
        });

        return { users };
    }

    async inviteUser(creatorId: string, boardId: string, targetUserId: string) {
        if (creatorId === targetUserId) {
            throw new ForbiddenException({
                code: 'errors.board.invite.selfInvite',
                message: 'Нельзя пригласить самого себя',
            });
        }

        await checkBoardPermission({
            prisma: this.prisma,
            userId: creatorId,
            boardId,
            permission: BoardPermission.INVITE_USERS,
        });

        const targetUser = await this.prisma.user.findUnique({
            where: { id: targetUserId },
            select: {
                id: true,
                nickname: true,
            },
        });

        if (!targetUser) {
            throw new NotFoundException({
                code: 'errors.account.userNotFound',
                message: 'Пользователь не найден',
            });
        }

        const isAlreadyMember = await this.prisma.boardMember.findFirst({
            where: {
                boardId,
                userId: targetUserId,
            },
        });

        if (isAlreadyMember) {
            throw new ConflictException({
                code: 'errors.board.invite.alreadyMember',
                message: 'Пользователь уже является участником этой доски',
            });
        }

        const existingInvite = await this.prisma.boardInvite.findFirst({
            where: {
                boardId,
                invitedUserId: targetUserId,
                expiresAt: { gt: new Date() },
            },
        });

        if (existingInvite) {
            throw new ConflictException({
                code: 'errors.board.invite.alreadySent',
                message: 'Приглашение этому пользователю уже отправлено',
            });
        }

        const board = await this.prisma.board.findUnique({
            where: { id: boardId },
            select: { title: true },
        });

        if (!board) {
            throw new NotFoundException({
                code: 'errors.board.notFound',
                message: 'Доска не найдена',
            });
        }

        const creator = await this.prisma.user.findUnique({
            where: { id: creatorId },
            select: { nickname: true },
        });

        const token = randomBytes(16).toString('hex');
        const invite = await this.prisma.boardInvite.create({
            data: {
                token,
                boardId,
                createdBy: creatorId,
                invitedUserId: targetUserId,
                expiresAt: addDays(new Date(), 1),
            },
        });

        const link = `${this.config.getOrThrow<string>('ALLOWED_ORIGIN')}/invite/${invite.token}`;

        await this.notificationsService.createNotification(targetUserId, {
            type: 'board_invite',
            messageKey: NotificationMessageKey.BOARD_INVITE,
            messageParams: {
                inviterName: creator?.nickname ?? '',
                boardTitle: board.title,
            },
            entityId: invite.token,
        });

        return {
            success: true,
            message: 'Приглашение отправлено',
            link,
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

        if (invite.invitedUserId && invite.invitedUserId !== userId) {
            throw new ForbiddenException({
                code: 'errors.board.invite.notForYou',
                message:
                    'Это приглашение предназначено для другого пользователя',
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

        if (invite.invitedUserId && invite.invitedUserId !== userId) {
            throw new ForbiddenException({
                code: 'errors.board.invite.notForYou',
                message:
                    'Это приглашение предназначено для другого пользователя',
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

        await this.achievements.updateAchievementProgress(
            invite.creator.id,
            'firstInvite',
            1,
        );
        await this.achievements.updateAchievementProgress(
            invite.creator.id,
            'teamBuilder',
            1,
        );

        await this.notificationsService.createNotification(invite.creator.id, {
            type: 'board',
            messageKey: NotificationMessageKey.BOARD_INVITE_ACCEPTED,
            messageParams: {
                nickname: acceptedUser?.nickname ?? '',
                boardTitle: invite.board.title,
            },
            entityId: invite.boardId,
        });

        await this.activityLog.log({
            boardId: invite.boardId,
            userId,
            action: 'MEMBER_JOINED',
            entityType: 'MEMBER',
            entityId: userId,
            entityTitle: acceptedUser?.nickname,
        });

        return {
            success: true,
            message: 'Инвайт в доску был принят',
        };
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

        if (invite.invitedUserId && invite.invitedUserId !== userId) {
            throw new ForbiddenException({
                code: 'errors.board.invite.notForYou',
                message:
                    'Это приглашение предназначено для другого пользователя',
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
            messageKey: NotificationMessageKey.BOARD_INVITE_DECLINED,
            messageParams: {
                nickname: acceptedUser?.nickname ?? '',
                boardTitle: invite.board.title,
            },
            entityId: invite.boardId,
        });

        return {
            success: true,
            message: 'Инвайт в доску был отклонен',
        };
    }
}
