import { SessionMetadata } from './session-metadata.types';

export interface SessionData {
    userId: string;
    createdAt: string | number;
    lastActiveAt: string | number;
    rememberMe?: boolean;
    metadata: SessionMetadata;
}

export interface UserSession {
    id: string;
    createdAt: string | number;
    lastActiveAt: string | number;
    rememberMe?: boolean;
    metadata: SessionMetadata;
    isCurrent?: boolean;
}

export type DeviceResult = {
    client?: { name?: string };
    os?: { name?: string };
    device?: { type?: string };
};
