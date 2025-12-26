import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateCardInput } from './inputs/create-card.input';
import { checkBoardAccess } from 'src/shared/utils/check-board-access.util';
import { UpdateCardInput } from './inputs/update-card.input';
import { ChatService } from '../chat/chat.service';
import { ReorderCardInput } from './inputs/reorder-card.input';
import { ReorderToNewColumn } from './inputs/reorder-to-new-column.input';

@Injectable()
export class CardService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly chat: ChatService,
    ) {}

    async create(userId: string, input: CreateCardInput) {
        const { columnId, title, description, priority, deadline } = input;

        await checkBoardAccess({ prisma: this.prisma, userId, columnId });

        const lastCard = await this.prisma.card.findFirst({
            where: { columnId },
            orderBy: { position: 'desc' },
        });

        const card = await this.prisma.card.create({
            data: {
                columnId,
                title,
                description,
                priority,
                deadline,
                position: lastCard ? lastCard.position + 1 : 0,
            },
        });

        const chat = await this.chat.createChat({ cardId: card.id });

        const updatedCard = await this.prisma.card.update({
            where: { id: card.id },
            data: { chatId: chat.id },
        });

        return updatedCard;
    }

    async update(userId: string, cardId: string, input: UpdateCardInput) {
        const card = await this.prisma.card.findUnique({
            where: { id: cardId },
        });

        if (!card) throw new NotFoundException('Карточка не найдена');

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            columnId: card.columnId,
        });

        return this.prisma.card.update({
            where: { id: cardId },
            data: {
                ...input,
            },
        });
    }

    async reorder(userId: string, input: ReorderCardInput) {
        const { columnId, cards } = input;

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            columnId,
        });

        const existingCards = await this.prisma.card.findMany({
            where: {
                id: {
                    in: cards,
                },
                columnId,
            },
            select: {
                id: true,
            },
        });

        if (existingCards.length !== cards.length) {
            throw new NotFoundException('Некоторые карточки не найдены');
        }

        const operations = cards.map((id, index) => {
            return this.prisma.card.update({
                where: { id },
                data: { position: index + 1 },
            });
        });

        await this.prisma.$transaction(operations);

        return this.prisma.card.findMany({
            where: { columnId },
            orderBy: { position: 'asc' },
        });
    }

    async reorderToNewColumn(userId: string, input: ReorderToNewColumn) {
        const { cardId, newColumnId, position } = input;

        const card = await this.prisma.card.findUnique({
            where: { id: cardId },
            include: { column: true },
        });

        if (!card) {
            throw new NotFoundException('Карточка не найдена');
        }

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            boardId: card.column.boardId,
        });

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            columnId: newColumnId,
        });

        await this.prisma.card.updateMany({
            where: {
                columnId: card.columnId,
                position: { gt: card.position },
            },
            data: {
                position: { decrement: 1 },
            },
        });

        await this.prisma.card.updateMany({
            where: {
                columnId: newColumnId,
                position: { gte: position },
            },
            data: {
                position: { increment: 1 },
            },
        });

        return this.prisma.card.update({
            where: { id: cardId },
            data: {
                columnId: newColumnId,
                position: position,
            },
        });
    }

    async delete(userId: string, cardId: string) {
        const card = await this.prisma.card.findUnique({
            where: { id: cardId },
        });

        if (!card) throw new NotFoundException('Карточка не найдена');

        await checkBoardAccess({
            prisma: this.prisma,
            userId,
            columnId: card.columnId,
        });

        return this.prisma.card.delete({
            where: { id: cardId },
        });
    }
}
