import {
    OnGatewayConnection,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/events',
})
export class EventsGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    private connections = new Map<string, Set<string>>();

    handleConnection(client: Socket) {
        const userId = client.handshake.auth?.userId;

        if (!userId) {
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

    emitToUser(userId: string, event: string, payload: any) {
        const sockets = this.connections.get(userId);

        if (!sockets) return;

        sockets.forEach((socketId) => {
            this.server.to(socketId).emit(event, payload);
        });
    }
}
