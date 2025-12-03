import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateMessageDto) {
        const { chatId, userId, text } = dto;

        if (!chatId || !userId || !text) {
            throw new BadRequestException('Переданы не все данные.');
        }

        return this.prisma.message.create({
            data: {
                chatId,
                userId,
                text,
            },
            include: { user: true },
        });
    }
}
