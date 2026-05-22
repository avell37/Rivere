import { ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';

export interface ValidateProps {
    currentUserId: string;
    currentUserRole: Role;
    targetUserId: string;
    targetRole: Role;
}

export const validateMemberManagement = ({
    currentUserId,
    currentUserRole,
    targetUserId,
    targetRole,
}: ValidateProps) => {
    if (currentUserId === targetUserId) {
        throw new ForbiddenException({
            code: 'errors.board.member.cannotManageSelf',
            message: 'Нельзя управлять собой',
        });
    }

    if (targetRole === 'OWNER') {
        throw new ForbiddenException({
            code: 'errors.board.member.cannotManageOwner',
            message: 'Нельзя управлять владельцем',
        });
    }

    if (currentUserRole === 'ADMIN' && targetRole === 'ADMIN') {
        throw new ForbiddenException({
            code: 'errors.board.member.noPermissions',
            message: 'Недостаточно прав',
        });
    }
};
