export interface BoardEventPayload {
    title: string;
    background: {
        url: string | null;
        color: string | null;
    };
}

export interface BoardBackground {
    url: string | null;
    color: string | null;
}

export interface ColumnEventPayload {
    id: string;
    title: string;
    position: number;
    boardId: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface CardEventPayload {
    id: string;
    title: string;
    description: string | null;
    position: number;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    deadline: Date | null;
    done: boolean;
    columnId: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}
