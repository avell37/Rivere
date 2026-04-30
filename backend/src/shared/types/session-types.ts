import { SessionMetadata } from './session-metadata.types';

export interface SessionData {
    userId: string;
    createdAt: number;
    lastActiveAt: number;
    metadata: SessionMetadata;
}

export interface UserSession {
    id: string;
    createdAt: number;
    lastActiveAt: number;
    metadata: SessionMetadata;
    isCurrent?: boolean;
}

export type DeviceResult = {
    client?: { name?: string };
    os?: { name?: string };
    device?: { type?: string };
};
