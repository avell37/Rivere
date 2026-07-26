import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { unsign } from 'cookie-signature';
import type { Socket } from 'socket.io';
import { PrismaService } from '@/core/prisma/prisma.service';
import { RedisService } from '@/core/redis/redis.service';
import type { SessionData } from '@/shared/types/session-types';
import { assertUserNotBanned } from '@/shared/utils/assert-user-not-banned.util';
import { parseCookieHeader } from '@/shared/utils/parse-cookie-header.util';

@Injectable()
export class WsSessionService {
    constructor(
        private readonly config: ConfigService,
        private readonly redis: RedisService,
        private readonly prisma: PrismaService,
    ) {}

    async getUserIdFromSocket(client: Socket): Promise<string | null> {
        const cookieHeader = client.handshake.headers.cookie;
        if (!cookieHeader) return null;

        const sessionName = this.config.getOrThrow<string>('SESSION_NAME');
        const secret = this.config.getOrThrow<string>('SESSION_SECRET');
        const prefix = this.config.getOrThrow<string>('SESSION_FOLDER');

        const cookies = parseCookieHeader(cookieHeader);
        const raw = cookies[sessionName];
        if (!raw) return null;

        let sessionId: string | null = null;

        if (raw.startsWith('s:')) {
            const unsigned = unsign(raw.slice(2), secret);
            sessionId = typeof unsigned === 'string' ? unsigned : null;
        } else {
            sessionId = raw;
        }

        if (!sessionId) return null;

        const sessionData = await this.redis.get(`${prefix}${sessionId}`);
        if (!sessionData) return null;

        try {
            const session = JSON.parse(sessionData) as SessionData;
            const userId = session.userId ?? null;

            if (!userId) return null;

            await assertUserNotBanned(this.prisma, userId);

            return userId;
        } catch {
            return null;
        }
    }
}
