import {
    Body,
    Controller,
    Delete,
    HttpCode,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { CreateColumnInput } from './inputs/create-column.input';
import { UpdateColumnInput } from './inputs/update-column.input';
import { ApiOperation } from '@nestjs/swagger';

@Controller('columns')
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    @ApiOperation({
        summary: 'Создание колонки',
        description: 'Создает колонку для пользователя.',
    })
    @HttpCode(200)
    @Authorization()
    @Post('create')
    async create(
        @SessionUser('id') userId: string,
        @Body() input: CreateColumnInput,
    ) {
        return this.columnService.create(userId, input);
    }

    @ApiOperation({
        summary: 'Обновление колонки',
        description: 'Обновляет колонку для пользователя.',
    })
    @Authorization()
    @Patch(':id')
    async update(
        @SessionUser('id') userId: string,
        @Param('id') columnId: string,
        @Body() input: UpdateColumnInput,
    ) {
        return this.columnService.update(userId, columnId, input);
    }

    @ApiOperation({
        summary: 'Удаление колонки',
        description: 'Удаляет колонку для пользователя.',
    })
    @Authorization()
    @Delete(':id')
    async delete(
        @SessionUser('id') userId: string,
        @Param('id') columnId: string,
    ) {
        return this.columnService.delete(userId, columnId);
    }
}
