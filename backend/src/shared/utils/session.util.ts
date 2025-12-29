import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import type { Request } from 'express';

export function saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
        req.session.regenerate((err) => {
            if (err) return reject(err);

            req.session.userId = user.id;
            req.session.createdAt = new Date().toISOString();
            req.session.userAgent = req.headers['user-agent'];
            req.session.lastActiveAt = new Date().toISOString();

            req.session.save((err) => {
                if (err) return reject(err);
                resolve({ message: 'Успешный вход' });
            });
        });
    });
}

export function destroySession(req: Request, configService: ConfigService) {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) {
                return reject(
                    new InternalServerErrorException(
                        'Не удалось удалить сессию',
                    ),
                );
            }

            req.res?.clearCookie(
                configService.getOrThrow<string>('SESSION_NAME'),
            );

            resolve(true);
        });
    });
}
