import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { destroySession } from '../utils/session.util';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class SessionAuthGuard implements CanActivate {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
        private readonly redis: RedisService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const session = request.session;
        const userId = session.userId;

        if (!session || !userId) {
            destroySession(request, this.configService);
            throw new UnauthorizedException('Необходима авторизация');
        }

        const sessionKey = `${this.configService.getOrThrow<string>('SESSION_FOLDER')}${session.id}`;
        const sessionExists = await this.redis.get(sessionKey);

        if (!sessionExists) {
            destroySession(request, this.configService);
            throw new UnauthorizedException(
                'Сессия истекла, пожалуйста, войдите снова',
            );
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                username: true,
                email: true,
                nickname: true,
                avatar: true,
            },
        });

        if (!user) {
            destroySession(request, this.configService);
            throw new UnauthorizedException('Пользователь не найден');
        }

        request.user = user;

        return true;
    }
}
