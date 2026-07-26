import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { S3Service } from '@/core/s3/s3.service';
import { PrismaService } from '@/core/prisma/prisma.service';
import { checkBoardAccess } from '@/shared/utils/check-board-access.util';
import { assertBoardActive } from '@/shared/utils/assert-board-active.util';
import {
    CARD_ATTACHMENT_MAX_COUNT,
    isAllowedCardAttachmentMime,
} from './card-attachment.constants';

@Injectable()
export class CardAttachmentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly storage: S3Service,
    ) {}

    private async assertCardAttachmentsAllowed(userId: string, cardId: string) {
        await checkBoardAccess({ prisma: this.prisma, userId, cardId });

        const card = await this.prisma.card.findUnique({
            where: { id: cardId },
            select: {
                archivedAt: true,
                column: {
                    select: {
                        boardId: true,
                        archivedAt: true,
                    },
                },
            },
        });

        if (!card?.column) {
            throw new NotFoundException({
                code: 'errors.card.notFound',
                message: 'Карточка не найдена',
            });
        }

        if (card.archivedAt || card.column.archivedAt) {
            throw new BadRequestException({
                code: 'errors.card.archived',
                message: 'Карточка находится в архиве',
            });
        }

        await assertBoardActive(this.prisma, card.column.boardId);
    }

    async list(userId: string, cardId: string) {
        await this.assertCardAttachmentsAllowed(userId, cardId);

        return this.prisma.cardAttachment.findMany({
            where: { cardId },
            orderBy: { createdAt: 'desc' },
            include: {
                uploadedBy: {
                    select: { id: true, nickname: true, username: true },
                },
            },
        });
    }

    async upload(userId: string, cardId: string, file: Express.Multer.File) {
        await this.assertCardAttachmentsAllowed(userId, cardId);

        if (!isAllowedCardAttachmentMime(file.mimetype)) {
            throw new BadRequestException({
                code: 'errors.upload.invalidType',
                message:
                    'Допустимы изображения (JPEG, PNG, GIF, WebP), PDF и TXT.',
            });
        }

        const count = await this.prisma.cardAttachment.count({
            where: { cardId },
        });

        if (count >= CARD_ATTACHMENT_MAX_COUNT) {
            throw new BadRequestException({
                code: 'errors.card.attachments.limit',
                message: `Максимум ${CARD_ATTACHMENT_MAX_COUNT} файлов на карточку.`,
            });
        }

        const key = await this.storage.upload(file);

        return this.prisma.cardAttachment.create({
            data: {
                key,
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
                cardId,
                uploadedById: userId,
            },
            include: {
                uploadedBy: {
                    select: { id: true, nickname: true, username: true },
                },
            },
        });
    }

    async remove(userId: string, cardId: string, attachmentId: string) {
        await this.assertCardAttachmentsAllowed(userId, cardId);

        const attachment = await this.prisma.cardAttachment.findFirst({
            where: { id: attachmentId, cardId },
        });

        if (!attachment) {
            throw new NotFoundException({
                code: 'errors.card.attachments.notFound',
                message: 'Вложение не найдено.',
            });
        }

        if (attachment.uploadedById !== userId) {
            throw new ForbiddenException({
                code: 'errors.card.attachments.forbidden',
                message: 'Нельзя удалить чужое вложение.',
            });
        }

        await this.storage.delete(attachment.key);
        await this.prisma.cardAttachment.delete({
            where: { id: attachment.id },
        });

        return { success: true };
    }

    async deleteAllForCard(cardId: string) {
        const attachments = await this.prisma.cardAttachment.findMany({
            where: { cardId },
        });

        await Promise.all(
            attachments.map((attachment) =>
                this.storage.delete(attachment.key),
            ),
        );
    }

    async deleteAllForColumn(columnId: string) {
        const attachments = await this.prisma.cardAttachment.findMany({
            where: { card: { columnId } },
        });

        await Promise.all(
            attachments.map((attachment) =>
                this.storage.delete(attachment.key),
            ),
        );
    }
}
