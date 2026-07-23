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
import { AchievementsService } from '../achievements/achievements.service';
import { WsSessionService } from '@/shared/services/ws-session.service';
import { PrismaService } from '@/core/prisma/prisma.service';
import { checkBoardAccess } from '@/shared/utils/check-board-access.util';
import { wsCorsOptions } from '@/shared/utils/ws-cors.util';
import {
    getSocketUserId,
    setSocketUserId,
} from '@/shared/utils/ws-socket.util';

@WebSocketGateway({
    cors: wsCorsOptions(),
    namespace: '/api/chat',
})
export class ChatGateway {
    @WebSocketServer()
    server!: Server;

    constructor(
        private readonly messagesService: MessagesService,
        private readonly achievementsService: AchievementsService,
        private readonly wsSession: WsSessionService,
        private readonly prisma: PrismaService,
    ) {}

    async handleConnection(client: Socket) {
        const userId = await this.wsSession.getUserIdFromSocket(client);

        if (!userId) {
            client.disconnect();
            return;
        }

        setSocketUserId(client, userId);
        client.emit('connected', client.id);
    }

    @SubscribeMessage('join')
    async handleJoin(
        @MessageBody() { chatId }: { chatId: string },
        @ConnectedSocket() client: Socket,
    ) {
        const userId = getSocketUserId(client);

        if (!userId) {
            client.disconnect();
            return;
        }

        try {
            await checkBoardAccess({
                prisma: this.prisma,
                userId,
                chatId,
            });

            await client.join(`chat_${chatId}`);
        } catch {
            client.emit('join:error', {
                code: 'errors.board.members.forbidden',
                message: 'Нет доступа к данной доске.',
            });
        }
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
        const userId = getSocketUserId(client);

        if (!userId) {
            client.disconnect();
            return;
        }

        try {
            await checkBoardAccess({
                prisma: this.prisma,
                userId,
                chatId: dto.chatId,
            });

            const message = await this.messagesService.create(userId, dto);

            await this.achievementsService.updateAchievementProgress(
                userId,
                'firstMessage',
                1,
            );

            await this.achievementsService.updateAchievementProgress(
                userId,
                'chatty',
                1,
            );

            if (!message.chat) {
                console.warn('Сообщение не связано с чатом:', message.id);
                return;
            }

            this.server.to(`chat_${dto.chatId}`).emit('message:new', message);
        } catch (err) {
            console.error('Error creating message:', err);
            client.emit('message:error', {
                error: 'Failed to create message',
            });
        }
    }

    emitMessageDeleted(
        chatId: string,
        payload: { id: string; deletedAt: string },
    ) {
        this.server.to(`chat_${chatId}`).emit('message:deleted', payload);
    }
}
