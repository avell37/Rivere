import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import type { User } from 'generated/prisma/client';
import { TokenType } from 'generated/prisma/enums';
import { PrismaService } from 'src/core/prisma/prisma.service';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TokenService {
    constructor(private readonly prisma: PrismaService) {}

    public async generateToken(
        user: User,
        type: TokenType,
        isUUID: boolean = false,
    ) {
        let token: string;

        if (isUUID) {
            token = uuidv4();
        } else {
            token = Math.floor(
                Math.random() * (1000000 - 100000) + 100000,
            ).toString();
        }

        const expiresIn = new Date(new Date().getTime() + 900000);

        const existingToken = await this.prisma.token.findFirst({
            where: {
                type,
                user: {
                    id: user.id,
                },
            },
        });

        if (existingToken) {
            await this.prisma.token.delete({
                where: {
                    id: existingToken.id,
                },
            });
        }

        const newToken = await this.prisma.token.create({
            data: {
                token,
                expiresIn,
                type,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });

        return newToken;
    }

    public async verifyToken(userId: string, token: string, type: TokenType) {
        const existingToken = await this.prisma.token.findFirst({
            where: {
                userId,
                token,
                type,
            },
        });

        if (!existingToken) {
            throw new NotFoundException({
                code: 'token.notFound',
                message: 'Токен не найден',
            });
        }

        if (new Date(existingToken.expiresIn) < new Date()) {
            throw new BadRequestException({
                code: 'token.expired',
                message: 'Код истек',
            });
        }

        if (existingToken.token !== token) {
            throw new BadRequestException({
                code: 'token.invalid',
                message: 'Неверный код',
            });
        }

        return existingToken;
    }
}
