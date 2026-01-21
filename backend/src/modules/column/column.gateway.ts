import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/boards',
})
export class ColumnGateway {
    @WebSocketServer()
    server: Server;

    boardRoom(boardId: string) {
        return `board_${boardId}`;
    }

    columnCreated(boardId: string, column: any) {
        this.server.to(this.boardRoom(boardId)).emit('column:created', column);
    }

    columnUpdated(boardId: string, column: any) {
        this.server.to(this.boardRoom(boardId)).emit('column:updated', column);
    }

    columnDeleted(boardId: string, columnId: string) {
        this.server
            .to(this.boardRoom(boardId))
            .emit('column:deleted', { columnId });
    }

    columnsReordered(boardId: string, columns: any[]) {
        this.server
            .to(this.boardRoom(boardId))
            .emit('column:reordered', columns);
    }
}
