import {
    OnGatewayConnection,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/achievements',
})
export class AchievementsGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        const userId = client.handshake.auth?.userId;

        client.join(`user_${userId}`);
    }

    sendProgress(userId: string, payload: any) {
        this.server.to(`user_${userId}`).emit('achievementProgress', payload);
    }

    sendAchievement(userId: string, payload: any) {
        this.server.to(`user_${userId}`).emit('achievementUnlocked', payload);
    }
}
