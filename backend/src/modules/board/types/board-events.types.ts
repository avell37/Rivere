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

export interface CardTagPayload {
    id: string;
    title: string;
    background: string;
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
    assigneeId: string | null;
    assignee: { id: string; nickname: string; avatar: string | null } | null;
    tags?: CardTagPayload[];
    createdAt: string | Date;
    updatedAt: string | Date;
}
