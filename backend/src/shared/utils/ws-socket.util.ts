import type { Socket } from 'socket.io';

interface WsSocketData {
    userId?: string;
}

const getSocketData = (client: Socket): WsSocketData =>
    client.data as WsSocketData;

export const setSocketUserId = (client: Socket, userId: string): void => {
    getSocketData(client).userId = userId;
};

export const getSocketUserId = (client: Socket): string | undefined => {
    return getSocketData(client).userId;
};

export const requireSocketUserId = (client: Socket): string | null => {
    const userId = getSocketUserId(client);
    return userId ?? null;
};
