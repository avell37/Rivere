import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { SessionMetadata } from '../types/session-metadata.types';
import type { User } from '@prisma/client';

export async function saveSession(
    req: Request,
    user: User,
    metadata: SessionMetadata,
) {
    req.session.userId = user.id;
    req.session.createdAt = new Date().toISOString();
    req.session.metadata = metadata;

    await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export async function destroySession(
    req: Request,
    configService: ConfigService,
) {
    await new Promise<void>((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) return reject(err);
            resolve();
        });
    });

    req.res?.clearCookie(configService.getOrThrow<string>('SESSION_NAME'), {
        path: '/',
    });
}
