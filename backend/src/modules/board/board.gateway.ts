import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/boards',
})
export class BoardGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private connections = new Map<string, Set<string>>();

    handleConnection(client: Socket) {
        const userId = client.handshake.auth?.userId;
        if (!userId || typeof userId !== 'string') return client.disconnect();

        const sockets = this.connections.get(userId) ?? new Set();
        sockets.add(client.id);
        this.connections.set(userId, sockets);
    }

    handleDisconnect(client: Socket) {
        for (const [userId, sockets] of this.connections.entries()) {
            if (sockets.has(client.id)) {
                sockets.delete(client.id);
                if (sockets.size === 0) this.connections.delete(userId);
                break;
            }
        }
    }

    @SubscribeMessage('board:join')
    handleJoin(
        @ConnectedSocket() client: Socket,
        @MessageBody() { boardId }: { boardId: string },
    ) {
        client.join(`board_${boardId}`);
    }

    @SubscribeMessage('board:leave')
    handleLeave(
        @ConnectedSocket() client: Socket,
        @MessageBody() { boardId }: { boardId: string },
    ) {
        client.leave(`board_${boardId}`);
    }

    boardRoom(boardId: string) {
        return `board_${boardId}`;
    }

    boardEdited(boardId: string, payload: any) {
        this.server.to(this.boardRoom(boardId)).emit('board:edited', payload);
    }

    boardDeleted(boardId: string, deletedBy: string) {
        this.server
            .to(this.boardRoom(boardId))
            .emit('board:deleted', { boardId, deletedBy });
    }

    kickUser(userId: string, boardId: string) {
        const sockets = this.connections.get(userId);
        sockets?.forEach((socketId) => {
            this.server.to(socketId).emit('board:kicked', { boardId });
        });
    }
}
