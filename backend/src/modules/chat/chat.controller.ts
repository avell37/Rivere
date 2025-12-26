import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    createChat(@Body() dto: CreateChatDto) {
        return this.chatService.createChat(dto);
    }

    @Get(':id')
    getChat(@Param('id') chatId: string) {
        return this.chatService.getChat(chatId);
    }
}
