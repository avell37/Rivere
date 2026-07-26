import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { SessionMetadata } from '../types/session-metadata.types';
import type { User } from '@prisma/client';
import { ms, StringValue } from '../utils/ms.util';

export async function saveSession(
    req: Request,
    user: User,
    metadata: SessionMetadata,
    options?: { rememberMe?: boolean; config?: ConfigService },
) {
    req.session.userId = user.id;
    req.session.createdAt = new Date().toISOString();
    req.session.metadata = metadata;
    req.session.rememberMe = options?.rememberMe ?? false;

    if (req.session.cookie && options?.config) {
        const rememberKey = 'SESSION_REMEMBER_MAX_AGE' as StringValue;
        const shortKey = 'SESSION_SHORT_MAX_AGE' as StringValue;

        req.session.cookie.maxAge = ms(
            options.rememberMe
                ? (options.config.get<StringValue>(rememberKey) ?? '30d')
                : (options.config.get<StringValue>(shortKey) ?? '1d'),
        );
    }

    await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
            if (err)
                return reject(
                    err instanceof Error ? err : new Error(String(err)),
                );
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
            if (err)
                return reject(
                    err instanceof Error ? err : new Error(String(err)),
                );
            resolve();
        });
    });

    req.res?.clearCookie(configService.getOrThrow<string>('SESSION_NAME'), {
        path: '/',
    });
}
