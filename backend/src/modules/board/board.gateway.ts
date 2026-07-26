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
    namespace: '/api/boards',
})
export class BoardGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server!: Server;

    private connections = new Map<string, Set<string>>();

    constructor(
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
    async handleJoin(
        @ConnectedSocket() client: Socket,
        @MessageBody() { boardId }: { boardId: string },
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
                boardId,
            });

            await client.join(`board_${boardId}`);
        } catch {
            client.emit('board:join:error', {
                code: 'errors.board.members.forbidden',
                message: 'Нет доступа к данной доске.',
            });
        }
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

    boardArchived(boardId: string, archivedBy: string) {
        this.server
            .to(this.boardRoom(boardId))
            .emit('board:archived', { boardId, archivedBy });
        this.boardDeleted(boardId, archivedBy);
    }

    boardRestored(boardId: string) {
        this.server
            .to(this.boardRoom(boardId))
            .emit('board:restored', { boardId });
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

    columnArchived(boardId: string, columnId: string) {
        this.server
            .to(this.boardRoom(boardId))
            .emit('column:archived', { columnId });
        this.columnDeleted(boardId, columnId);
    }

    columnRestored(boardId: string, column: ColumnEventPayload) {
        this.server.to(this.boardRoom(boardId)).emit('column:restored', column);
    }

    columnPermanentDeleted(boardId: string, columnId: string) {
        this.server
            .to(this.boardRoom(boardId))
            .emit('column:permanent-deleted', { columnId });
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

    cardArchived(boardId: string, cardId: string) {
        this.server
            .to(this.boardRoom(boardId))
            .emit('card:archived', { cardId });
        this.cardDeleted(boardId, cardId);
    }

    cardRestored(boardId: string, card: CardEventPayload) {
        this.server.to(this.boardRoom(boardId)).emit('card:restored', card);
    }

    cardPermanentDeleted(boardId: string, cardId: string) {
        this.server
            .to(this.boardRoom(boardId))
            .emit('card:permanent-deleted', { cardId });
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
