import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { CreateMessageDto } from '../messages/dto/create-message.dto';

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/chat',
})
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly chatService: ChatService,
        private readonly messagesService: MessagesService,
    ) {}

    handleConnection(client: Socket) {
        console.log('User connected:', client.id);
        client.emit('connected', client.id);
    }

    @SubscribeMessage('join')
    handleJoin(
        @MessageBody() { chatId }: { chatId: string },
        @ConnectedSocket() client: Socket,
    ) {
        client.join(`chat_${chatId}`);
    }

    @SubscribeMessage('leave')
    handleLeave(
        @MessageBody() { chatId }: { chatId: string },
        @ConnectedSocket() client: Socket,
    ) {
        client.leave(`chat_${chatId}`);
    }

    @SubscribeMessage('message')
    async handleMessage(
        @MessageBody() dto: CreateMessageDto,
        @ConnectedSocket() client: Socket,
    ) {
        const message = await this.messagesService.create(dto);
        this.server.to(`chat_${dto.chatId}`).emit('message:new', message);
    }
}
