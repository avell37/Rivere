import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardInput } from './inputs/create-board.input';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateBoardInput } from './inputs/update-board.input';

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
        description: 'Отдает запрашиваемую доску по ID',
    })
    @Authorization()
    @Get(':id')
    async getBoard(
        @SessionUser('id') userId: string,
        @Param('id') boardId: string,
    ) {
        return this.boardService.getBoard(userId, boardId);
    }

    @ApiOperation({
        summary: 'Удаление доски',
        description: 'Удаляет определенную доску по ID.',
    })
    @HttpCode(200)
    @Authorization()
    @Patch(':boardId')
    async updateBoard(
        @SessionUser('id') userId: string,
        @Param('boardId') boardId: string,
        @Body() input: UpdateBoardInput,
    ) {
        return this.boardService.updateBoard(userId, boardId, input);
    }

    @ApiOperation({
        summary: 'Удаление доски',
        description: 'Удаляет определенную доску по ID.',
    })
    @HttpCode(200)
    @Authorization()
    @Delete(':boardId')
    async deleteBoard(
        @SessionUser('id') userId: string,
        @Param('boardId') boardId: string,
    ) {
        return this.boardService.deleteBoard(userId, boardId);
    }
}
