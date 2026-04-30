import {
    OnGatewayConnection,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthPayload } from '../../shared/types/AuthPayload';

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/api/achievements',
})
export class AchievementsGateway implements OnGatewayConnection {
    @WebSocketServer()
    server!: Server;

    handleConnection(client: Socket) {
        const auth = client.handshake.auth as AuthPayload;
        const userId = auth?.userId;

        void client.join(`user_${userId}`);
    }

    sendProgress(userId: string, payload: unknown) {
        this.server.to(`user_${userId}`).emit('achievementProgress', payload);
    }

    sendAchievement(userId: string, payload: unknown) {
        this.server.to(`user_${userId}`).emit('achievementUnlocked', payload);
    }
}
