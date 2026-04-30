import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { CreateMessageDto } from '../messages/dto/create-message.dto';

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/api/chat',
})
export class ChatGateway {
    @WebSocketServer()
    server!: Server;

    constructor(private readonly messagesService: MessagesService) {}

    handleConnection(client: Socket) {
        client.emit('connected', client.id);
    }

    @SubscribeMessage('join')
    handleJoin(
        @MessageBody() { chatId }: { chatId: string },
        @ConnectedSocket() client: Socket,
    ) {
        void client.join(`chat_${chatId}`);
    }

    @SubscribeMessage('leave')
    handleLeave(
        @MessageBody() { chatId }: { chatId: string },
        @ConnectedSocket() client: Socket,
    ) {
        void client.leave(`chat_${chatId}`);
    }

    @SubscribeMessage('message')
    async handleMessage(
        @MessageBody() dto: CreateMessageDto,
        @ConnectedSocket() client: Socket,
    ) {
        try {
            const message = await this.messagesService.create(dto);

            if (!message.chat) {
                console.warn('Сообщение не связано с чатом:', message.id);
                return;
            }

            this.server.to(`chat_${dto.chatId}`).emit('message:new', message);
        } catch (err) {
            console.error('Error creating message:', err);
            client.emit('message:error', {
                error: 'Failed to create message',
                details: err instanceof Error ? err.message : 'Unknown error',
            });
        }
    }
}
