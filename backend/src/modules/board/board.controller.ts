import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardInput } from './inputs/create-board.input';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { Authorization } from 'src/shared/decorators/authorization.decorator';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Authorization()
    @Post('create')
    async create(
        @SessionUser() userId: string,
        @Body() input: CreateBoardInput,
    ) {
        return this.boardService.create(userId, input);
    }

    @Authorization()
    @Get(':id')
    async getBoard(
        @SessionUser() userId: string,
        @Param('id') boardId: string,
    ) {
        return this.boardService.getBoard(userId, boardId);
    }
}
