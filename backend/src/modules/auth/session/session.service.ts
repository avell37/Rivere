import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { LoginInput } from './inputs/login.input';
import { verify } from 'argon2';
import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { destroySession, saveSession } from 'src/shared/utils/session.util';
import { RedisService } from 'src/core/redis/redis.service';
import { parseUserAgent } from 'src/shared/utils/user-agent.util';

@Injectable()
export class SessionService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly redis: RedisService,
    ) {}

    async findCurrentSession(req: Request) {
        const sessionId = req.session.id;

        const sessionData = await this.redis.get(
            `${this.config.getOrThrow<string>('SESSION_FOLDER')}${sessionId}`,
        );

        if (!sessionData) {
            throw new NotFoundException({
                code: 'errors.session.notFound',
                message: 'Сессия не найдена',
            });
        }

        const session = JSON.parse(sessionData);

        const parsed = parseUserAgent(session.userAgent);

        return {
            id: sessionId,
            ...parsed,
            createdAt: session.createdAt,
            lastActiveAt: session.lastActiveAt,
            isCurrent: true,
        };
    }

    async findAllUserSessions(userId: string, currentSessionId: string) {
        const prefix = this.config.getOrThrow<string>('SESSION_FOLDER');
        const keys = await this.redis.keys(`${prefix}*`);

        const sessions: any[] = [];

        for (const key of keys) {
            const raw = await this.redis.get(key);
            if (!raw) continue;

            const session = JSON.parse(raw);

            if (session.userId === userId) {
                const id = key.replace(prefix, '');

                const parsed = parseUserAgent(session.userAgent);

                sessions.push({
                    id,
                    ...parsed,
                    userAgent: session.userAgent,
                    createdAt: session.createdAt,
                    lastActiveAt: session.lastActiveAt,
                    isCurrent: id === currentSessionId,
                });
            }
        }

        return sessions;
    }

    async terminateSession(
        sessionId: string,
        userId: string,
        currentSessionId: string,
    ) {
        if (sessionId === currentSessionId) {
            throw new BadRequestException({
                code: 'errors.session.cannotTerminateCurrent',
                message: 'Невозможно завершить текущую сессию',
            });
        }

        const key = `${this.config.getOrThrow<string>('SESSION_FOLDER')}${sessionId}`;
        const raw = await this.redis.get(key);

        if (!raw) {
            throw new NotFoundException({
                code: 'errors.session.notFound',
                message: 'Сессия не найдена',
            });
        }

        const session = JSON.parse(raw);

        if (session.userId !== userId) {
            throw new UnauthorizedException({
                code: 'errors.session.accessDenied',
                message: 'Отказано в доступе',
            });
        }

        await this.redis.del(key);

        return {
            code: 'session.ended',
            message: 'Сессия завершена',
        };
    }

    async terminateAllExceptCurrent(userId: string, currentSessionId: string) {
        const prefix = this.config.getOrThrow<string>('SESSION_FOLDER');
        const keys = await this.redis.keys(`${prefix}*`);

        for (const key of keys) {
            const raw = await this.redis.get(key);
            if (!raw) continue;

            const session = JSON.parse(raw);
            const id = key.replace(prefix, '');

            if (session.userId === userId && id !== currentSessionId) {
                await this.redis.del(key);
            }
        }

        return {
            code: 'sessions.allEnded',
            message: 'Все сессии завершены',
        };
    }

    async login(req: Request, input: LoginInput) {
        const { login, password } = input;

        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { username: { equals: login } },
                    { email: { equals: login } },
                ],
            },
        });

        if (!user) {
            throw new NotFoundException({
                code: 'errors.account.userNotFound',
                message: 'Пользователь не найден',
            });
        }

        const isValidPassword = await verify(user.password, password);

        if (!isValidPassword) {
            throw new UnauthorizedException({
                code: 'errors.account.notValidCurrentPassword',
                message: 'Неверный текущий пароль',
            });
        }

        return saveSession(req, user);
    }

    async logout(req: Request) {
        return destroySession(req, this.config);
    }
}
