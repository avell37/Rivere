import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { CardService } from './card.service';
import { CardAttachmentService } from './card-attachment.service';
import {
    CARD_ATTACHMENT_MAX_BYTES,
    isAllowedCardAttachmentMime,
} from './card-attachment.constants';
import { CreateCardInput } from './inputs/create-card.input';
import { UpdateCardInput } from './inputs/update-card.input';
import { ReorderCardInput } from './inputs/reorder-card.input';
import { ReorderToNewColumn } from './inputs/reorder-to-new-column.input';
import { Authorization } from '@/shared/decorators/authorization.decorator';
import { SessionUser } from '@/shared/decorators/session-user.decorator';

@Controller('cards')
export class CardController {
    constructor(
        private readonly cardService: CardService,
        private readonly cardAttachments: CardAttachmentService,
    ) {}

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
    @HttpCode(200)
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
    @HttpCode(200)
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
    @HttpCode(200)
    @Authorization()
    @Post('reorderToNewColumn')
    async reorderToNewColumn(
        @SessionUser('id') userId: string,
        @Body() input: ReorderToNewColumn,
    ) {
        return this.cardService.reorderToNewColumn(userId, input);
    }

    @ApiOperation({
        summary: 'Архивирование карточки',
        description:
            'Переносит карточку в архив вместо безвозвратного удаления.',
    })
    @HttpCode(200)
    @Authorization()
    @Delete(':id')
    async delete(
        @SessionUser('id') userId: string,
        @Param('id') cardId: string,
    ) {
        return this.cardService.delete(userId, cardId);
    }

    @ApiOperation({
        summary: 'Безвозвратное удаление карточки из архива',
    })
    @HttpCode(200)
    @Authorization()
    @Delete(':id/permanent')
    async permanentDelete(
        @SessionUser('id') userId: string,
        @Param('id') cardId: string,
    ) {
        return this.cardService.permanentDelete(userId, cardId);
    }

    @ApiOperation({
        summary: 'Восстановление карточки из архива',
    })
    @HttpCode(200)
    @Authorization()
    @Post(':id/restore')
    async restore(
        @SessionUser('id') userId: string,
        @Param('id') cardId: string,
    ) {
        return this.cardService.restore(userId, cardId);
    }

    @ApiOperation({
        summary: 'Получение чата',
        description: 'Получает чат со всеми сообщениями',
    })
    @Authorization()
    @Get(':cardId/chat')
    async getChatByCard(
        @SessionUser('id') userId: string,
        @Param('cardId') cardId: string,
    ) {
        return this.cardService.getChatByCard(userId, cardId);
    }

    @ApiOperation({ summary: 'Список вложений карточки' })
    @Authorization()
    @Get(':cardId/attachments')
    async listAttachments(
        @SessionUser('id') userId: string,
        @Param('cardId') cardId: string,
    ) {
        return this.cardAttachments.list(userId, cardId);
    }

    @ApiOperation({ summary: 'Загрузить вложение к карточке' })
    @Authorization()
    @HttpCode(200)
    @Post(':cardId/attachments')
    @UseInterceptors(
        FileInterceptor('file', {
            limits: { fileSize: CARD_ATTACHMENT_MAX_BYTES },
            fileFilter: (_req, file, cb) => {
                if (!isAllowedCardAttachmentMime(file.mimetype)) {
                    return cb(
                        new BadRequestException({
                            code: 'errors.upload.invalidType',
                            message:
                                'Допустимы изображения (JPEG, PNG, GIF, WebP), PDF и TXT.',
                        }),
                        false,
                    );
                }

                cb(null, true);
            },
        }),
    )
    async uploadAttachment(
        @SessionUser('id') userId: string,
        @Param('cardId') cardId: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!file) {
            throw new BadRequestException({
                code: 'errors.upload.missingFile',
                message: 'Файл не передан.',
            });
        }

        return this.cardAttachments.upload(userId, cardId, file);
    }

    @ApiOperation({ summary: 'Удалить вложение карточки' })
    @Authorization()
    @HttpCode(200)
    @Delete(':cardId/attachments/:attachmentId')
    async deleteAttachment(
        @SessionUser('id') userId: string,
        @Param('cardId') cardId: string,
        @Param('attachmentId') attachmentId: string,
    ) {
        return this.cardAttachments.remove(userId, cardId, attachmentId);
    }
}
