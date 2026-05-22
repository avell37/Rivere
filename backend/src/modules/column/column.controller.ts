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
import { CreateColumnInput } from './inputs/create-column.input';
import { UpdateColumnInput } from './inputs/update-column.input';
import { ApiOperation } from '@nestjs/swagger';
import { ReorderColumnInput } from './inputs/reorder-column.input';
import { Authorization } from '@/shared/decorators/authorization.decorator';
import { SessionUser } from '@/shared/decorators/session-user.decorator';

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
    @HttpCode(200)
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
        summary: 'Обновление позиции',
        description: 'Обновляет позицию колонки в доске.',
    })
    @HttpCode(200)
    @Authorization()
    @Post('reorder')
    async reorder(@Body() input: ReorderColumnInput) {
        return this.columnService.reorder(input);
    }

    @ApiOperation({
        summary: 'Удаление колонки',
        description: 'Удаляет колонку для пользователя.',
    })
    @HttpCode(200)
    @Authorization()
    @Delete(':id')
    async delete(
        @SessionUser('id') userId: string,
        @Param('id') columnId: string,
    ) {
        return this.columnService.delete(userId, columnId);
    }
}
