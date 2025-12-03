import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService) {}

    async createChat(dto: CreateChatDto) {
        const { cardId } = dto;

        return this.prisma.chat.create({
            data: {
                card: { connect: { id: cardId } },
            },
            include: {
                card: true,
                messages: true,
            },
        });
    }
}
