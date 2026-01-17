import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @ApiOperation({
        summary: 'Создание чата',
        description: 'Создает чат в карточке',
    })
    @HttpCode(200)
    @Post()
    createChat(@Body() dto: CreateChatDto) {
        return this.chatService.createChat(dto);
    }
}
