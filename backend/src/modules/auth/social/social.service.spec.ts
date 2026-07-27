import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthProvider } from '@prisma/client';
import { hash } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { SocialService } from './social.service';
import { PrismaService } from '@/core/prisma/prisma.service';
import { RedisService } from '@/core/redis/redis.service';
import { StatisticsService } from '@/modules/statistics/statistics.service';
import { YandexProvider } from './providers/yandex.provider';
import { SocialProvider } from './social-provider.enum';
import { getSessionMetadata } from '@/shared/utils/session-metadata.util';
import { saveSession } from '@/shared/utils/session.util';

jest.mock('argon2', () => ({
    hash: jest.fn().mockResolvedValue('hashed-password'),
}));

jest.mock('@/shared/utils/session-metadata.util', () => ({
    getSessionMetadata: jest.fn(),
}));

jest.mock('@/shared/utils/session.util', () => ({
    saveSession: jest.fn(),
}));

describe('SocialService', () => {
    let service: SocialService;

    type UserUpdateArgs = {
        where: { id: string };
        data: { yandexId: string };
    };

    type UserCreateArgs = {
        data: {
            email: string;
            authProvider: AuthProvider;
            yandexId: string;
            isEmailVerified: boolean;
        };
    };

    const updateUserMock = jest.fn<
        Promise<{ yandexId: string }>,
        [UserUpdateArgs]
    >();
    const createUserMock = jest.fn<
        Promise<{ id: string; authProvider: AuthProvider }>,
        [UserCreateArgs]
    >();

    const prisma = {
        user: {
            findFirst: jest.fn(),
            findUnique: jest.fn(),
            create: createUserMock,
            update: updateUserMock,
        },
    };

    const redis = {
        setex: jest.fn(),
        get: jest.fn(),
        del: jest.fn(),
    };

    const config = {
        get: jest.fn().mockReturnValue('http://localhost:3000'),
        getOrThrow: jest.fn((key: string) => {
            if (key === 'ALLOWED_ORIGIN') {
                return 'http://localhost:3000';
            }

            return undefined;
        }),
    };

    const statistics = {
        getOrCreate: jest.fn(),
    };

    const yandexProvider = {
        getAuthorizationUrl: jest.fn(),
        exchangeCodeForProfile: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SocialService,
                { provide: PrismaService, useValue: prisma },
                { provide: RedisService, useValue: redis },
                { provide: ConfigService, useValue: config },
                { provide: StatisticsService, useValue: statistics },
                { provide: YandexProvider, useValue: yandexProvider },
            ],
        }).compile();

        service = module.get(SocialService);
        jest.resetAllMocks();
        (hash as jest.Mock).mockResolvedValue('hashed-password');
        (getSessionMetadata as jest.Mock).mockReturnValue({ ip: '127.0.0.1' });
        (saveSession as jest.Mock).mockResolvedValue(undefined);
        yandexProvider.getAuthorizationUrl.mockReturnValue(
            'https://oauth.yandex.ru/authorize?state=test',
        );
    });

    describe('getAuthorizationUrl', () => {
        it('stores oauth state in redis and returns provider url', async () => {
            redis.setex.mockResolvedValue('OK');

            const url = await service.getAuthorizationUrl('yandex');

            expect(url).toContain('oauth.yandex.ru');
            expect(redis.setex).toHaveBeenCalledWith(
                expect.stringContaining('oauth:state:'),
                600,
                SocialProvider.YANDEX,
            );
        });

        it('throws for unsupported provider', () => {
            expect(() => service.getAuthorizationUrl('github')).toThrow(
                BadRequestException,
            );
        });
    });

    describe('findOrCreateUser', () => {
        it('returns existing user by provider id', async () => {
            const existingUser = {
                id: 'user-1',
                yandexId: '777',
                nickname: 'Alex',
                avatar: null,
                isEmailVerified: true,
            };

            prisma.user.findFirst.mockResolvedValue(existingUser);
            updateUserMock.mockResolvedValue(existingUser);

            const result = await service.findOrCreateUser(
                {
                    providerId: '777',
                    displayName: 'Alex Updated',
                    email: 'alex@example.com',
                },
                SocialProvider.YANDEX,
            );

            expect(result).toEqual(existingUser);
            expect(createUserMock).not.toHaveBeenCalled();
        });

        it('links provider to existing email account', async () => {
            prisma.user.findFirst.mockResolvedValue(null);
            prisma.user.findUnique.mockResolvedValue({
                id: 'user-2',
                email: 'alex@example.com',
                yandexId: null,
                nickname: 'Alex',
                avatar: null,
            });
            updateUserMock.mockResolvedValue({
                id: 'user-2',
                yandexId: '777',
            });

            const result = await service.findOrCreateUser(
                {
                    providerId: '777',
                    email: 'alex@example.com',
                    displayName: 'Alex',
                },
                SocialProvider.YANDEX,
            );

            expect(result.yandexId).toBe('777');

            const updateCall = updateUserMock.mock.calls[0][0];

            expect(updateCall).toMatchObject({
                where: { id: 'user-2' },
                data: { yandexId: '777' },
            });
        });

        it('creates a new oauth user', async () => {
            prisma.user.findFirst.mockResolvedValue(null);
            prisma.user.findUnique.mockResolvedValue(null);
            createUserMock.mockResolvedValue({
                id: 'user-3',
                authProvider: AuthProvider.YANDEX,
            });

            const result = await service.findOrCreateUser(
                {
                    providerId: '777',
                    email: 'alex@example.com',
                    displayName: 'Alex',
                },
                SocialProvider.YANDEX,
            );

            expect(result.id).toBe('user-3');

            const createCall = createUserMock.mock.calls[0][0];

            expect(createCall).toMatchObject({
                data: {
                    email: 'alex@example.com',
                    authProvider: AuthProvider.YANDEX,
                    yandexId: '777',
                    isEmailVerified: true,
                },
            });
        });

        it('throws when email account already linked to another provider profile', async () => {
            prisma.user.findFirst.mockResolvedValue(null);
            prisma.user.findUnique.mockResolvedValue({
                id: 'user-4',
                yandexId: 'existing-id',
            });

            await expect(
                service.findOrCreateUser(
                    {
                        providerId: '777',
                        email: 'alex@example.com',
                    },
                    SocialProvider.YANDEX,
                ),
            ).rejects.toBeInstanceOf(ConflictException);
        });
    });

    describe('handleCallback', () => {
        const createRequest = () =>
            ({
                session: {
                    regenerate: jest.fn((cb: (err?: Error) => void) => cb()),
                },
            }) as unknown as import('express').Request;

        it('creates session after successful oauth callback', async () => {
            redis.get.mockResolvedValue(SocialProvider.YANDEX);
            yandexProvider.exchangeCodeForProfile.mockResolvedValue({
                providerId: '777',
                email: 'alex@example.com',
                displayName: 'Alex',
            });
            prisma.user.findFirst.mockResolvedValue({
                id: 'user-1',
                yandexId: '777',
                nickname: 'Alex',
                avatar: null,
                isEmailVerified: true,
                bannedUntil: null,
            });
            updateUserMock.mockResolvedValue({
                id: 'user-1',
                bannedUntil: null,
            });
            statistics.getOrCreate.mockResolvedValue({});

            await service.handleCallback(
                'yandex',
                'oauth-code',
                'state-1',
                createRequest(),
                'jest-agent',
            );

            expect(saveSession).toHaveBeenCalled();
            expect(statistics.getOrCreate).toHaveBeenCalledWith('user-1');
        });

        it('rejects banned users', async () => {
            redis.get.mockResolvedValue(SocialProvider.YANDEX);
            yandexProvider.exchangeCodeForProfile.mockResolvedValue({
                providerId: '777',
                email: 'alex@example.com',
            });
            prisma.user.findFirst.mockResolvedValue({
                id: 'user-1',
                yandexId: '777',
                nickname: 'Alex',
                avatar: null,
                isEmailVerified: true,
                bannedUntil: new Date(Date.now() + 60_000),
            });
            updateUserMock.mockResolvedValue({
                id: 'user-1',
                bannedUntil: new Date(Date.now() + 60_000),
            });

            await expect(
                service.handleCallback(
                    'yandex',
                    'oauth-code',
                    'state-1',
                    createRequest(),
                    'jest-agent',
                ),
            ).rejects.toBeInstanceOf(ForbiddenException);
        });
    });
});
