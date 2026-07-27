import { ConfigService } from '@nestjs/config';
import type { CookieOptions } from 'express';
import { parseBoolean } from '@/shared/utils/parse-boolean.util';

export function getSessionCookieOptions(
    config: ConfigService,
): Pick<CookieOptions, 'domain' | 'httpOnly' | 'secure' | 'sameSite' | 'path'> {
    const nodeEnv = config.get<string>('NODE_ENV');
    const sessionDomain = config.get<string>('SESSION_DOMAIN');
    const cookieDomain =
        sessionDomain && !sessionDomain.includes(':')
            ? sessionDomain
            : nodeEnv === 'development'
              ? 'localhost'
              : undefined;

    return {
        path: '/',
        httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
        secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
        sameSite: 'lax',
        ...(cookieDomain ? { domain: cookieDomain } : {}),
    };
}
