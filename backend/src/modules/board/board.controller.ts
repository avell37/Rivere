import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardInput } from './inputs/create-board.input';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @ApiOperation({
        summary: 'Создание доски',
        description: 'Создает доску для пользователя.',
    })
    @HttpCode(200)
    @Authorization()
    @Post('create')
    async create(
        @SessionUser('id') userId: string,
        @Body() input: CreateBoardInput,
    ) {
        return this.boardService.create(userId, input);
    }

    @ApiOperation({
        summary: 'Получение досок пользователя',
        description:
            'Отдает все доски пользователя, в том числе, в которые пользователя пригласили.',
    })
    @Authorization()
    @Get('userBoards')
    async getUserBoards(@SessionUser('id') userId: string) {
        return this.boardService.getUserBoards(userId);
    }

    @ApiOperation({
        summary: 'Получение доски',
        description: 'Отдает определенную доску по ID.',
    })
    @Authorization()
    @Get(':id')
    async getBoard(
        @SessionUser() userId: string,
        @Param('id') boardId: string,
    ) {
        return this.boardService.getBoard(userId, boardId);
    }

    @ApiOperation({
        summary: 'Удаление доски',
        description: 'Удаляет определенную доску по ID.',
    })
    @Authorization()
    @Delete()
    async deleteBoard(@Param('id') boardId: string) {
        return this.boardService.deleteBoard(boardId);
    }

    @ApiOperation({
        summary: 'Создание инвайта',
        description: 'Создает инвайт-ссылку, чтобы присоединиться к доске.',
    })
    @HttpCode(200)
    @Authorization()
    @Post('invite/:boardId')
    async createInvite(
        @SessionUser('id') userId: string,
        @Param('boardId') boardId: string,
    ) {
        return this.boardService.createInvite(userId, boardId);
    }

    @ApiOperation({
        summary: 'Принять инвайт',
        description: 'При вызове метода принимается приглашение в доску.',
    })
    @HttpCode(200)
    @Authorization()
    @Post('invite/accept/:token')
    async acceptInvite(
        @SessionUser('id') userId: string,
        @Param('token') token: string,
    ) {
        return this.boardService.acceptInvite(userId, token);
    }
}
