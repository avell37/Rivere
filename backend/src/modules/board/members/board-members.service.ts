import { ForbiddenException, Injectable } from '@nestjs/common';
import { BoardGateway } from '../board.gateway';
import { PrismaService } from '@/core/prisma/prisma.service';
import { Role } from '@prisma/client';
import {
    ALLOWED_ROLES,
    checkBoardPermission,
    isValidRole,
} from '@/shared/utils/board-permissions';
import { BoardPermission } from '@/shared/types/board-permissions.enum';
import { validateMemberManagement } from '@/shared/utils/validate-member-management';
import { checkBoardAccess } from '@/shared/utils/check-board-access.util';
import { ActivityLogService } from '../../activity-log/activity-log.service';

@Injectable()
export class BoardMembersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly boardGateway: BoardGateway,
        private readonly activityLog: ActivityLogService,
    ) {}

    async getAllMembers(userId: string, boardId: string) {
        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            boardId,
        });

        const members = await this.prisma.boardMember.findMany({
            where: {
                boardId,
            },
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
            orderBy: {
                createdAt: 'desc',
            },
        });

        return members;
    }

    async updateMemberRole(
        currentUserId: string,
        boardId: string,
        targetUserId: string,
        role: Role,
    ) {
        if (!isValidRole(role)) {
            throw new ForbiddenException({
                code: 'errors.board.member.invalidRole',
                message: 'Некорректная роль',
            });
        }

        if (!ALLOWED_ROLES.includes(role)) {
            throw new ForbiddenException({
                code: 'errors.board.member.roleNotAllowed',
                message: 'Эту роль нельзя назначить',
            });
        }

        await checkBoardPermission({
            prisma: this.prisma,
            userId: currentUserId,
            boardId,
            permission: BoardPermission.MANAGE_ROLES,
        });

        const targetMember = await this.prisma.boardMember.findFirst({
            where: {
                boardId,
                userId: targetUserId,
            },
        });

        if (!targetMember) {
            throw new ForbiddenException({
                code: 'errors.board.member.targetNotFound',
                message: 'Участник не найден',
            });
        }

        if (targetMember.role === 'OWNER') {
            throw new ForbiddenException({
                code: 'errors.board.member.cannotChangeOwner',
                message: 'Нельзя изменить роль владельца доски',
            });
        }

        if (targetUserId === currentUserId) {
            throw new ForbiddenException({
                code: 'errors.board.member.cannotChangeSelf',
                message: 'Нельзя изменить собственную роль',
            });
        }

        const targetUser = await this.prisma.user.findUnique({
            where: { id: targetUserId },
            select: { nickname: true, username: true },
        });

        await this.prisma.boardMember.update({
            where: { id: targetMember.id },
            data: { role },
        });

        await this.activityLog.log({
            boardId,
            userId: currentUserId,
            action: 'MEMBER_ROLE_CHANGED',
            entityType: 'MEMBER',
            entityId: targetUserId,
            entityTitle: targetUser?.nickname ?? targetUser?.username,
            meta: { newRole: role },
        });

        return {
            success: true,
            message: 'Роль успешно обновлена',
        };
    }

    async deleteMember(
        currentUserId: string,
        boardId: string,
        targetUserId: string,
    ) {
        const currentMember = await checkBoardPermission({
            prisma: this.prisma,
            userId: currentUserId,
            boardId,
            permission: BoardPermission.KICK_USERS,
        });

        const targetMember = await this.prisma.boardMember.findFirst({
            where: { boardId, userId: targetUserId },
        });

        if (!targetMember) {
            throw new ForbiddenException({
                code: 'errors.board.invite.notMember',
                message: 'Вы не являетесь участником этой доски',
            });
        }

        validateMemberManagement({
            currentUserId,
            currentUserRole: currentMember.role,
            targetUserId,
            targetRole: targetMember.role,
        });

        const targetUser = await this.prisma.user.findUnique({
            where: { id: targetUserId },
            select: { nickname: true, username: true },
        });

        await this.prisma.boardMember.delete({
            where: {
                id: targetMember.id,
            },
        });

        this.boardGateway.kickUser(targetUserId, boardId);

        await this.activityLog.log({
            boardId,
            userId: currentUserId,
            action: 'MEMBER_LEFT',
            entityType: 'MEMBER',
            entityId: targetUserId,
            entityTitle: targetUser?.nickname ?? targetUser?.username,
        });

        return {
            success: true,
            message: 'Участник успешно исключен из доски',
        };
    }

    async leaveBoard(userId: string, boardId: string) {
        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            boardId,
        });

        const member = await this.prisma.boardMember.findFirst({
            where: { boardId, userId },
        });

        if (!member) {
            throw new ForbiddenException({
                code: 'errors.board.invite.notMember',
                message: 'Вы не являетесь участником этой доски',
            });
        }

        if (member.role === 'OWNER') {
            throw new ForbiddenException({
                code: 'errors.board.member.ownerCannotLeave',
                message:
                    'Владелец не может покинуть доску. Сначала передайте права или удалите доску.',
            });
        }

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { nickname: true, username: true },
        });

        await this.prisma.boardMember.delete({
            where: { id: member.id },
        });

        await this.activityLog.log({
            boardId,
            userId,
            action: 'MEMBER_LEFT',
            entityType: 'MEMBER',
            entityId: userId,
            entityTitle: user?.nickname ?? user?.username,
            meta: { self: true },
        });

        return {
            success: true,
            message: 'Вы покинули доску',
        };
    }
}
