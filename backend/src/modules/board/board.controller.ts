import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardInput } from './inputs/create-board.input';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { Authorization } from 'src/shared/decorators/authorization.decorator';

@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Authorization()
    @Post('create')
    async create(
        @SessionUser('id') userId: string,
        @Body() input: CreateBoardInput,
    ) {
        return this.boardService.create(userId, input);
    }

    @Authorization()
    @Get('userBoards')
    async getUserBoards(@SessionUser('id') userId: string) {
        return this.boardService.getUserBoards(userId);
    }

    @Authorization()
    @Get(':id')
    async getBoard(
        @SessionUser() userId: string,
        @Param('id') boardId: string,
    ) {
        return this.boardService.getBoard(userId, boardId);
    }

    @Authorization()
    @Delete()
    async deleteBoard(@Param('id') boardId: string) {
        return this.boardService.deleteBoard(boardId);
    }

    @Authorization()
    @Post('invite/:boardId')
    async createInvite(
        @SessionUser('id') userId: string,
        @Param('boardId') boardId: string,
    ) {
        return this.boardService.createInvite(userId, boardId);
    }

    @Authorization()
    @Post('invite/accept/:token')
    async acceptInvite(
        @SessionUser('id') userId: string,
        @Param('token') token: string,
    ) {
        return this.boardService.acceptInvite(userId, token);
    }
}
