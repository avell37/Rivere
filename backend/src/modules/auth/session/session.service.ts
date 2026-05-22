import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { LoginInput } from './inputs/login.input';
import { verify } from 'argon2';
import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/core/prisma/prisma.service';
import { RedisService } from '@/core/redis/redis.service';
import { SessionData, UserSession } from '@/shared/types/session-types';
import { getSessionMetadata } from '@/shared/utils/session-metadata.util';
import { destroySession, saveSession } from '@/shared/utils/session.util';

@Injectable()
export class SessionService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly redis: RedisService,
    ) {}

    async findCurrentSession(req: Request): Promise<UserSession> {
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

        const session = JSON.parse(sessionData) as SessionData;

        return {
            id: sessionId,
            createdAt: session.createdAt,
            lastActiveAt: session.lastActiveAt,
            metadata: session.metadata,
        };
    }

    async findAllUserSessions(req: Request): Promise<UserSession[]> {
        const userId = req.session.userId;

        if (!userId) {
            throw new NotFoundException({
                code: 'session.notFoundMultiple',
                message: 'Одна или несколько сессий не найдены',
            });
        }

        const prefix = this.config.getOrThrow<string>('SESSION_FOLDER');
        const keys = await this.redis.keys(`${prefix}*`);

        const userSessions: UserSession[] = [];

        for (const key of keys) {
            const sessionData = await this.redis.get(key);

            if (sessionData) {
                const session = JSON.parse(sessionData) as SessionData;

                if (session.userId === userId) {
                    userSessions.push({
                        id: key.split(':')[1],
                        createdAt: session.createdAt,
                        lastActiveAt: session.lastActiveAt,
                        metadata: session.metadata,
                        isCurrent: key.split(':')[1] === req.session.id,
                    });
                }
            }
        }

        userSessions.sort((a, b) => b.createdAt - a.createdAt);

        return userSessions;
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

        const session = JSON.parse(raw) as SessionData;

        if (session.userId !== userId) {
            throw new UnauthorizedException({
                code: 'errors.session.accessDenied',
                message: 'Отказано в доступе',
            });
        }

        await this.redis.del(key);

        return {
            success: true,
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

            const session = JSON.parse(raw) as SessionData;
            const id = key.replace(prefix, '');

            if (session.userId === userId && id !== currentSessionId) {
                await this.redis.del(key);
            }
        }

        return {
            success: true,
            code: 'sessions.allEnded',
            message: 'Все сессии завершены',
        };
    }

    async login(req: Request, input: LoginInput, userAgent: string) {
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

        const metadata = getSessionMetadata(req, userAgent, this.config);

        await this.prisma.userStats.upsert({
            where: { userId: user.id },
            update: {
                lastActiveDate: new Date(),
            },
            create: {
                userId: user.id,
                lastActiveDate: new Date(),
            },
        });

        await saveSession(req, user, metadata);

        return {
            success: true,
            message: 'Успешно',
        };
    }

    async logout(req: Request) {
        await destroySession(req, this.config);

        return {
            success: true,
            message: 'Успешно',
        };
    }
}
