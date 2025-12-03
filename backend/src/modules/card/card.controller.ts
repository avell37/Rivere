import {
    Body,
    Controller,
    Delete,
    HttpCode,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CardService } from './card.service';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { CreateCardInput } from './inputs/create-card.input';
import { UpdateCardInput } from './inputs/update-card.input';
import { ApiOperation } from '@nestjs/swagger';
import { ReorderCardInput } from './inputs/reorder-card.input';
import { ReorderToNewColumn } from './inputs/reorder-to-new-column.input';

@Controller('cards')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @ApiOperation({
        summary: 'Создание карточки',
        description: 'Создает карточку для пользователя.',
    })
    @HttpCode(200)
    @Authorization()
    @Post('create')
    async create(
        @SessionUser('id') userId: string,
        @Body() input: CreateCardInput,
    ) {
        return this.cardService.create(userId, input);
    }

    @ApiOperation({
        summary: 'Обновление карточки',
        description: 'Обновляет карточку новыми данными от пользователя.',
    })
    @Authorization()
    @Patch(':id')
    async update(
        @SessionUser('id') userId: string,
        @Param('id') cardId: string,
        @Body() input: UpdateCardInput,
    ) {
        return this.cardService.update(userId, cardId, input);
    }

    @ApiOperation({
        summary: 'Обновление позиции в старой колонке',
        description: 'Обновляет позицию карточки в старой колонке.',
    })
    @Authorization()
    @Post('reorder')
    async reorder(
        @SessionUser('id') userId: string,
        @Body() input: ReorderCardInput,
    ) {
        return this.cardService.reorder(userId, input);
    }

    @ApiOperation({
        summary: 'Обновление позиции в новой колонке',
        description: 'Обновляет позицию карточки в новой колонке.',
    })
    @Authorization()
    @Post('reorderToNewColumn')
    async reorderToNewColumn(
        @SessionUser('id') userId: string,
        @Body() input: ReorderToNewColumn,
    ) {
        return this.cardService.reorderToNewColumn(userId, input);
    }

    @ApiOperation({
        summary: 'Удаление карточки',
        description: 'Удаляет определенную карточку.',
    })
    @Authorization()
    @Delete(':id')
    async delete(
        @SessionUser('id') userId: string,
        @Param('id') cardId: string,
    ) {
        return this.cardService.delete(userId, cardId);
    }
}
