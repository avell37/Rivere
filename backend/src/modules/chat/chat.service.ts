import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from '@/core/prisma/prisma.service';

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
