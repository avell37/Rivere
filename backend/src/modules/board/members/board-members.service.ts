import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { BoardGateway } from '../board.gateway';

@Injectable()
export class BoardMembersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly boardGateway: BoardGateway,
    ) {}

    async deleteMember(
        currentUserId: string,
        boardId: string,
        targetUserId: string,
    ) {
        const allowedRoles = ['OWNER', 'ADMIN'];
        const currentMember = await this.prisma.boardMember.findFirst({
            where: { boardId, userId: currentUserId },
        });

        if (!currentMember) {
            throw new ForbiddenException({
                code: 'errors.board.invite.notMember',
                message: 'Вы не являетесь участником этой доски',
            });
        }

        const targetMember = await this.prisma.boardMember.findFirst({
            where: { boardId, userId: targetUserId },
        });

        if (!targetMember) {
            throw new ForbiddenException({
                code: 'errors.board.invite.notMember',
                message: 'Вы не являетесь участником этой доски',
            });
        }

        if (targetMember.role === 'OWNER') {
            throw new ForbiddenException({
                code: 'errors.board.invite.cannotRemoveOwner',
                message: 'Нельзя удалить владельца доски',
            });
        }

        if (!allowedRoles.includes(currentMember.role)) {
            throw new ForbiddenException({
                code: 'errors.board.invite.noPermissions',
                message: 'Недостаточно прав для удаления участника',
            });
        }

        await this.prisma.boardMember.delete({
            where: {
                id: targetMember.id,
            },
        });

        this.boardGateway.kickUser(targetUserId, boardId);

        return true;
    }
}
