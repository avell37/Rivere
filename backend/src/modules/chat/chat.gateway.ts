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
import { NotificationsService } from '../notifications/notifications.service';
import { PrismaService } from 'src/core/prisma/prisma.service';

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
        private readonly notification: NotificationsService,
        private readonly prisma: PrismaService,
    ) {}

    handleConnection(client: Socket) {
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

        if (!message.chat) {
            console.warn('Сообщение не связано с чатом:', message.id);
            return;
        }

        const members = message.chat.card.column.board.members;

        for (const member of members) {
            if (member.userId === dto.userId) continue;

            const notification = await this.prisma.notification.create({
                data: {
                    userId: member.userId,
                    type: 'NEW_MESSAGE',
                    message: 'Пришло новое сообщение в чате',
                    entityId: message.chat.id,
                },
            });

            this.notification.send(member.userId, notification);
        }

        this.server.to(`chat_${dto.chatId}`).emit('message:new', message);
    }
}
