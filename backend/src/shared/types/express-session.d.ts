import 'express-session';
import { SessionMetadata } from './session-metadata.types';

declare module 'express-session' {
    interface SessionData {
        userId?: string;
        createdAt?: string;
        lastActiveAt?: string;
        metadata?: SessionMetadata;
    }
}
