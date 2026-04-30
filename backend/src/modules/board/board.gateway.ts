import { AuthPayload } from '@/shared/types/AuthPayload';
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
import {
    BoardEventPayload,
    CardEventPayload,
    ColumnEventPayload,
} from './types/board-events.types';

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/api/boards',
})
export class BoardGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server!: Server;

    private connections = new Map<string, Set<string>>();

    handleConnection(client: Socket) {
        const auth = client.handshake.auth as AuthPayload;
        const userId = auth?.userId;

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
        void client.join(`board_${boardId}`);
    }

    @SubscribeMessage('board:leave')
    handleLeave(
        @ConnectedSocket() client: Socket,
        @MessageBody() { boardId }: { boardId: string },
    ) {
        void client.leave(`board_${boardId}`);
    }

    boardRoom(boardId: string) {
        return `board_${boardId}`;
    }

    boardEdited(boardId: string, payload: BoardEventPayload) {
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

    // column

    columnCreated(boardId: string, column: ColumnEventPayload) {
        this.server.to(this.boardRoom(boardId)).emit('column:created', column);
    }

    columnUpdated(boardId: string, column: ColumnEventPayload) {
        this.server.to(this.boardRoom(boardId)).emit('column:updated', column);
    }

    columnDeleted(boardId: string, columnId: string) {
        this.server
            .to(this.boardRoom(boardId))
            .emit('column:deleted', { columnId });
    }

    columnsReordered(boardId: string, columns: ColumnEventPayload[]) {
        this.server
            .to(this.boardRoom(boardId))
            .emit('column:reordered', columns);
    }

    // card

    cardCreated(boardId: string, card: CardEventPayload) {
        this.server.to(this.boardRoom(boardId)).emit('card:created', card);
    }

    cardUpdated(boardId: string, card: CardEventPayload) {
        this.server.to(this.boardRoom(boardId)).emit('card:updated', card);
    }

    cardDeleted(boardId: string, cardId: string) {
        this.server
            .to(this.boardRoom(boardId))
            .emit('card:deleted', { cardId });
    }

    cardMoved(
        boardId: string,
        payload: {
            cardId: string;
            fromColumnId: string;
            toColumnId: string;
            position: number;
        },
    ) {
        this.server.to(this.boardRoom(boardId)).emit('card:moved', payload);
    }

    cardsReordered(
        boardId: string,
        payload: {
            columnId: string;
            cards: { id: string; position: number }[];
        },
    ) {
        this.server
            .to(this.boardRoom(boardId))
            .emit('cards:reordered', payload);
    }
}
