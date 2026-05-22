import { Role } from '@prisma/client';
import { BoardPermission } from '../types/board-permissions.enum';
import { PrismaService } from '@/core/prisma/prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export const ALLOWED_ROLES: Role[] = ['ADMIN', 'MEMBER'];

export interface CheckBoardPermissionParams {
    prisma: PrismaService;
    userId: string;
    boardId: string;
    permission: BoardPermission;
}

export const isValidRole = (role: string): role is Role => {
    return Object.values(Role).includes(role as Role);
};

export const hasPermission = (role: Role, permission: BoardPermission) => {
    return BOARD_ROLE_PERMISSIONS[role].includes(permission);
};

export const BOARD_ROLE_PERMISSIONS: Record<Role, BoardPermission[]> = {
    OWNER: [
        BoardPermission.MANAGE_BOARD,
        BoardPermission.DELETE_BOARD,
        BoardPermission.MANAGE_ROLES,
        BoardPermission.INVITE_USERS,
        BoardPermission.KICK_USERS,

        BoardPermission.CREATE_COLUMN,
        BoardPermission.UPDATE_COLUMN,
        BoardPermission.DELETE_COLUMN,

        BoardPermission.CREATE_CARD,
        BoardPermission.UPDATE_CARD,
        BoardPermission.DELETE_CARD,
    ],

    ADMIN: [
        BoardPermission.MANAGE_BOARD,
        BoardPermission.INVITE_USERS,
        BoardPermission.KICK_USERS,

        BoardPermission.CREATE_COLUMN,
        BoardPermission.UPDATE_COLUMN,
        BoardPermission.DELETE_COLUMN,

        BoardPermission.CREATE_CARD,
        BoardPermission.UPDATE_CARD,
        BoardPermission.DELETE_CARD,
    ],

    MEMBER: [
        BoardPermission.CREATE_COLUMN,
        BoardPermission.UPDATE_COLUMN,

        BoardPermission.CREATE_CARD,
        BoardPermission.UPDATE_CARD,
    ],
};

export const checkBoardPermission = async ({
    prisma,
    userId,
    boardId,
    permission,
}: CheckBoardPermissionParams) => {
    const member = await prisma.boardMember.findFirst({
        where: {
            userId,
            boardId,
        },
    });

    if (!member) {
        throw new NotFoundException({
            code: 'errors.board.members.notFound',
            message: 'Участник доски не найден',
        });
    }

    const allowed = hasPermission(member.role, permission);

    if (!allowed) {
        throw new ForbiddenException({
            code: 'errors.board.forbidden',
            message: 'Недостаточно прав',
        });
    }

    return member;
};
