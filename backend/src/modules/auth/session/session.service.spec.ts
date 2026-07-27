import {
    ForbiddenException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { verify } from 'argon2';
import { ConfigService } from '@nestjs/config';

jest.mock('argon2', () => ({
    verify: jest.fn(),
}));

jest.mock('@/shared/utils/session-metadata.util', () => ({
    getSessionMetadata: jest.fn(),
}));

jest.mock('@/shared/utils/session.util', () => ({
    saveSession: jest.fn(),
    destroySession: jest.fn(),
}));

import { SessionService } from './session.service';
import { PrismaService } from '@/core/prisma/prisma.service';
import { RedisService } from '@/core/redis/redis.service';
import { getSessionMetadata } from '@/shared/utils/session-metadata.util';
import { saveSession } from '@/shared/utils/session.util';

describe('SessionService', () => {
    let service: SessionService;

    const prisma = {
        user: {
            findFirst: jest.fn(),
        },
        userStats: {
            upsert: jest.fn(),
        },
    };

    const config = {
        getOrThrow: jest.fn().mockReturnValue('sessions:'),
    };

    const redis = {
        get: jest.fn(),
        keys: jest.fn(),
        del: jest.fn(),
    };

    const createRequest = () =>
        ({
            session: {
                id: 'session-1',
                regenerate: jest.fn((cb: (err?: Error) => void) => cb()),
                save: jest.fn((cb: (err?: Error) => void) => cb()),
            },
        }) as unknown as import('express').Request;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SessionService,
                { provide: PrismaService, useValue: prisma },
                { provide: ConfigService, useValue: config },
                { provide: RedisService, useValue: redis },
            ],
        }).compile();

        service = module.get(SessionService);
        jest.clearAllMocks();
        (getSessionMetadata as jest.Mock).mockReturnValue({ ip: '127.0.0.1' });
        (saveSession as jest.Mock).mockResolvedValue(undefined);
        prisma.userStats.upsert.mockResolvedValue({});
    });

    describe('login', () => {
        it('throws when user is not found', async () => {
            prisma.user.findFirst.mockResolvedValue(null);

            await expect(
                service.login(
                    createRequest(),
                    { login: 'missing', password: 'secret12' },
                    'jest-agent',
                ),
            ).rejects.toBeInstanceOf(NotFoundException);
        });

        it('throws when password is invalid', async () => {
            prisma.user.findFirst.mockResolvedValue({
                id: 'user-1',
                password: 'hashed-password',
                bannedUntil: null,
            });
            (verify as jest.Mock).mockResolvedValue(false);

            await expect(
                service.login(
                    createRequest(),
                    { login: 'user', password: 'wrong-password' },
                    'jest-agent',
                ),
            ).rejects.toBeInstanceOf(UnauthorizedException);
        });

        it('throws when user is banned', async () => {
            const bannedUntil = new Date(Date.now() + 60_000);

            prisma.user.findFirst.mockResolvedValue({
                id: 'user-1',
                password: 'hashed-password',
                bannedUntil,
            });
            (verify as jest.Mock).mockResolvedValue(true);

            await expect(
                service.login(
                    createRequest(),
                    { login: 'user', password: 'secret12' },
                    'jest-agent',
                ),
            ).rejects.toBeInstanceOf(ForbiddenException);
        });

        it('creates session for valid credentials', async () => {
            const user = {
                id: 'user-1',
                password: 'hashed-password',
                bannedUntil: null,
            };

            prisma.user.findFirst.mockResolvedValue(user);
            (verify as jest.Mock).mockResolvedValue(true);

            const req = createRequest();
            const result = await service.login(
                req,
                { login: 'user', password: 'secret12', rememberMe: true },
                'jest-agent',
            );

            expect(result).toEqual({
                success: true,
                message: 'Успешно',
            });
            expect(prisma.userStats.upsert).toHaveBeenCalled();
            expect(saveSession).toHaveBeenCalledWith(
                req,
                user,
                { ip: '127.0.0.1' },
                { rememberMe: true, config },
            );
        });
    });
});
