import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/boards',
})
export class CardGateway {
    @WebSocketServer()
    server: Server;

    boardRoom(boardId: string) {
        return `board_${boardId}`;
    }

    cardCreated(boardId: string, card: any) {
        this.server.to(this.boardRoom(boardId)).emit('card:created', card);
    }

    cardUpdated(boardId: string, card: any) {
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
