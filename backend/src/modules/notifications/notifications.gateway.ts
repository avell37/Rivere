import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsSessionService } from '@/shared/services/ws-session.service';
import { wsCorsOptions } from '@/shared/utils/ws-cors.util';
import { setSocketUserId } from '@/shared/utils/ws-socket.util';

@WebSocketGateway({
    cors: wsCorsOptions(),
    namespace: '/api/notifications',
})
export class NotificationsGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    private server!: Server;
    private connections = new Map<string, Set<string>>();

    constructor(private readonly wsSession: WsSessionService) {}

    async handleConnection(client: Socket) {
        const userId = await this.wsSession.getUserIdFromSocket(client);

        if (!userId) {
            client.disconnect();
            return;
        }

        setSocketUserId(client, userId);

        const sockets = this.connections.get(userId) ?? new Set();
        sockets.add(client.id);

        this.connections.set(userId, sockets);
    }

    handleDisconnect(client: Socket) {
        for (const [userId, sockets] of this.connections.entries()) {
            if (sockets.has(client.id)) {
                sockets.delete(client.id);

                if (sockets.size === 0) {
                    this.connections.delete(userId);
                }

                break;
            }
        }
    }

    sendNotification(userId: string, payload: unknown) {
        const sockets = this.connections.get(userId);
        if (!sockets) return;

        sockets.forEach((socketId) => {
            this.server.to(socketId).emit('notification', payload);
        });
    }
}
