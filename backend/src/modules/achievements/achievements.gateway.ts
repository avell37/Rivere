import {
    OnGatewayConnection,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsSessionService } from '@/shared/services/ws-session.service';
import { wsCorsOptions } from '@/shared/utils/ws-cors.util';
import { setSocketUserId } from '@/shared/utils/ws-socket.util';

@WebSocketGateway({
    cors: wsCorsOptions(),
    namespace: '/api/achievements',
})
export class AchievementsGateway implements OnGatewayConnection {
    @WebSocketServer()
    server!: Server;

    constructor(private readonly wsSession: WsSessionService) {}

    async handleConnection(client: Socket) {
        const userId = await this.wsSession.getUserIdFromSocket(client);

        if (!userId) {
            client.disconnect();
            return;
        }

        setSocketUserId(client, userId);
        await client.join(`user_${userId}`);
    }

    sendProgress(userId: string, payload: unknown) {
        this.server.to(`user_${userId}`).emit('achievementProgress', payload);
    }

    sendAchievement(userId: string, payload: unknown) {
        this.server.to(`user_${userId}`).emit('achievementUnlocked', payload);
    }
}
