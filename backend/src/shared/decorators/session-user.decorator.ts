import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import type { User } from 'generated/prisma/client';
import type { Request } from 'express';

export const SessionUser = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();

        const user = request.user as User;

        if (!user) {
            throw new UnauthorizedException({
                code: 'errors.user.notFound',
                message: 'Пользователь не найден',
            });
        }

        return data ? user[data] : user;
    },
);
