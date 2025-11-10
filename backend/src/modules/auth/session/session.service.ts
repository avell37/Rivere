import {
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
            throw new NotFoundException('Сессия не найдена');
        }

        const session = JSON.parse(sessionData);

        return {
            ...session,
            id: sessionId,
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
            throw new NotFoundException('Пользователь не найден');
        }

        const isValidPassword = await verify(user.password, password);

        if (!isValidPassword) {
            throw new UnauthorizedException('Неверный пароль');
        }

        return saveSession(req, user);
    }

    async logout(req: Request) {
        return destroySession(req, this.config);
    }
}
