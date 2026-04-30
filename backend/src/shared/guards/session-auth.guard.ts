import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { destroySession } from '../utils/session.util';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '@/core/prisma/prisma.service';
import { RedisService } from '@/core/redis/redis.service';

@Injectable()
export class SessionAuthGuard implements CanActivate {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
        private readonly redis: RedisService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const session = request.session;
        const userId = session.userId;

        if (!session || !userId) {
            await destroySession(request, this.configService);
            throw new UnauthorizedException({
                code: 'errors.user.unauthorized',
                message: 'Необходима авторизация',
            });
        }

        const sessionKey = `${this.configService.getOrThrow<string>('SESSION_FOLDER')}${session.id}`;
        const sessionExists = await this.redis.get(sessionKey);

        if (!sessionExists) {
            await destroySession(request, this.configService);
            throw new UnauthorizedException({
                code: 'errors.user.unauthorized',
                message: 'Необходима авторизация',
            });
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                role: true,
                username: true,
                email: true,
                nickname: true,
                avatar: true,
                bannedUntil: true,
            },
        });

        const skipBan = this.reflector.get<boolean>(
            'skipBan',
            context.getHandler(),
        );

        if (!user) {
            await destroySession(request, this.configService);
            throw new UnauthorizedException({
                code: 'errors.user.notFound',
                message: 'Пользователь не найден',
            });
        }

        if (
            !skipBan &&
            user.bannedUntil &&
            new Date(user.bannedUntil) > new Date()
        ) {
            throw new ForbiddenException({
                message: 'Пользователь заблокирован',
                code: 'errors.user.banned',
                bannedUntil: user.bannedUntil,
            });
        }

        request.user = user;

        return true;
    }
}
