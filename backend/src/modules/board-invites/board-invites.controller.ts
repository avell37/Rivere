import { Authorization } from '@/shared/decorators/authorization.decorator';
import { SessionUser } from '@/shared/decorators/session-user.decorator';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { InviteUserInput } from './input/invite-user.input';
import { BoardInvitesService } from './board-invites.service';

@Controller('boardInvites')
export class BoardInvitesController {
    constructor(private readonly boardInvitesService: BoardInvitesService) {}

    @ApiOperation({
        summary: 'Создание инвайта',
        description: 'Создает инвайт-ссылку, чтобы присоединиться к доске.',
    })
    @HttpCode(200)
    @Authorization()
    @Throttle({
        default: {
            ttl: 1000 * 60 * 10,
            limit: 10,
        },
    })
    @Post(':boardId/invites')
    async createInvite(
        @SessionUser('id') userId: string,
        @Param('boardId') boardId: string,
    ) {
        return this.boardInvitesService.createInvite(userId, boardId);
    }

    @ApiOperation({
        summary: 'Поиск пользователей для приглашения',
        description: 'Ищет пользователей по username, nickname или email',
    })
    @Authorization()
    @Throttle({
        default: {
            ttl: 60000,
            limit: 30,
        },
    })
    @Get(':boardId/users/search')
    async searchUsers(
        @SessionUser('id') userId: string,
        @Param('boardId') boardId: string,
        @Query('q') query: string,
    ) {
        return this.boardInvitesService.searchUsers(userId, boardId, query);
    }

    @ApiOperation({
        summary: 'Пригласить пользователя',
        description: 'Отправляет персональное приглашение пользователю',
    })
    @HttpCode(200)
    @Authorization()
    @Throttle({
        default: {
            ttl: 1000 * 60 * 10,
            limit: 10,
        },
    })
    @Post(':boardId/invite-user')
    async inviteUser(
        @SessionUser('id') userId: string,
        @Param('boardId') boardId: string,
        @Body() input: InviteUserInput,
    ) {
        return this.boardInvitesService.inviteUser(
            userId,
            boardId,
            input.userId,
        );
    }

    @ApiOperation({
        summary: 'Получить данные приглашения',
        description:
            'При вызове метода отдаются данные о доске, создателе приглашения и дате истечения приглашения.',
    })
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
