import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Socket, Server } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
    cors: { origin: true },
    namespace: '/chat',
})
export class MessagesGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly messagesService: MessagesService) {}

    @SubscribeMessage('join')
    handleJoin(
        @MessageBody() data: { chatId: string },
        @ConnectedSocket() client: Socket,
    ) {
        client.join(`chat_${data.chatId}`);
    }

    @SubscribeMessage('message')
    async handleSendMessage(@MessageBody() dto: CreateMessageDto) {
        const message = await this.messagesService.create(dto);
        this.server.to(`chat_${dto.chatId}`).emit('message', message);
    }
}
