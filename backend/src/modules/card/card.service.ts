import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateCardInput } from './inputs/create-card.input';
import { checkBoardAccess } from 'src/shared/utils/check-board-access.util';
import { UpdateCardInput } from './inputs/update-card.input';

@Injectable()
export class CardService {
    constructor(private readonly prisma: PrismaService) {}

    async create(userId: string, input: CreateCardInput) {
        const { columnId, title, description } = input;

        await checkBoardAccess({ prisma: this.prisma, userId, columnId });

        return this.prisma.card.create({
            data: {
                columnId,
                title,
                description,
            },
        });
    }

    async update(userId: string, cardId: string, input: UpdateCardInput) {
        const { title, description } = input;
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
                title,
                description,
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
