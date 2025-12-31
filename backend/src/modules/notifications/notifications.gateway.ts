import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/notifications',
})
export class NotificationsGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    private server: Server;
    private connections = new Map<string, Set<string>>();

    handleConnection(client: Socket) {
        const userId = client.handshake.auth?.userId;

        if (!userId || typeof userId !== 'string') {
            client.disconnect();
            return;
        }

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

    sendNotification(userId: string, payload: any) {
        const sockets = this.connections.get(userId);
        if (!sockets) return;

        sockets.forEach((socketId) => {
            this.server.to(socketId).emit('notification', payload);
        });
    }
}
