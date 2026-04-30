import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { BoardInvitesService } from './board-invites.service';
import { ApiOperation } from '@nestjs/swagger';
import { Authorization } from '@/shared/decorators/authorization.decorator';
import { SessionUser } from '@/shared/decorators/session-user.decorator';

@Controller('boardInvites')
export class BoardInvitesController {
    constructor(private readonly boardInvitesService: BoardInvitesService) {}

    @ApiOperation({
        summary: 'Создание инвайта',
        description: 'Создает инвайт-ссылку, чтобы присоединиться к доске.',
    })
    @HttpCode(200)
    @Authorization()
    @Post(':boardId/invites')
    async createInvite(
        @SessionUser('id') userId: string,
        @Param('boardId') boardId: string,
    ) {
        return this.boardInvitesService.createInvite(userId, boardId);
    }

    @ApiOperation({
        summary: 'Получить данные приглашения',
        description:
            'При вызове метода отдаются данные о доске, создателе приглашения и дате истечения приглашения.',
    })
    @HttpCode(200)
    @Authorization()
    @Get('invites/:token')
    async getInvite(
        @Param('token') token: string,
        @SessionUser('id') userId: string,
    ) {
        return this.boardInvitesService.getInvite(token, userId);
    }

    @ApiOperation({
        summary: 'Принять инвайт',
        description: 'При вызове метода принимается приглашение в доску.',
    })
    @HttpCode(200)
    @Authorization()
    @Post('invites/:token')
    async acceptInvite(
        @SessionUser('id') userId: string,
        @Param('token') token: string,
    ) {
        return this.boardInvitesService.acceptInvite(userId, token);
    }

    @ApiOperation({
        summary: 'Отклонить инвайт',
        description:
            'При вызове метода отклоняется приглашение в доску и удаляется ссылка-инвайт.',
    })
    @HttpCode(200)
    @Authorization()
    @Delete('decline/:token')
    async declineInvite(
        @SessionUser('id') userId: string,
        @Param('token') token: string,
    ) {
        return this.boardInvitesService.declineInvite(userId, token);
    }
}
