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

@Injectable()
export class BoardMembersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly boardGateway: BoardGateway,
    ) {}

    async getAllMembers(boardId: string) {
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

        await this.prisma.boardMember.update({
            where: { id: targetMember.id },
            data: { role },
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

        await this.prisma.boardMember.delete({
            where: {
                id: targetMember.id,
            },
        });

        this.boardGateway.kickUser(targetUserId, boardId);

        return {
            success: true,
            message: 'Участник успешно исключен из доски',
        };
    }
}
