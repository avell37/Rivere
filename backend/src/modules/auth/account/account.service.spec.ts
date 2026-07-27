import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

jest.mock('../verification/verification.service', () => ({
    VerificationService: class MockVerificationService {},
}));

jest.mock('argon2', () => ({
    hash: jest.fn().mockResolvedValue('hashed-password'),
    verify: jest.fn(),
}));

jest.mock('@/shared/utils/session-metadata.util', () => ({
    getSessionMetadata: jest.fn(),
}));

jest.mock('@/shared/utils/session.util', () => ({
    saveSession: jest.fn(),
    destroySession: jest.fn(),
}));

import { AccountService } from './account.service';
import { hash } from 'argon2';
import { PrismaService } from '@/core/prisma/prisma.service';
import { FilesService } from '@/modules/files/files.service';
import { StatisticsService } from '@/modules/statistics/statistics.service';
import { VerificationService } from '../verification/verification.service';
import { getSessionMetadata } from '@/shared/utils/session-metadata.util';
import { saveSession } from '@/shared/utils/session.util';

describe('AccountService', () => {
    let service: AccountService;

    const prisma = {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    };

    const filesService = {};
    const statistics = {
        getOrCreate: jest.fn(),
    };
    const verificationService = {
        sendVerificationToken: jest.fn(),
    };
    const config = {};

    const createRequest = () =>
        ({
            session: {
                save: jest.fn((cb: (err?: Error) => void) => cb()),
            },
        }) as unknown as import('express').Request;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AccountService,
                { provide: PrismaService, useValue: prisma },
                { provide: FilesService, useValue: filesService },
                { provide: StatisticsService, useValue: statistics },
                {
                    provide: VerificationService,
                    useValue: verificationService,
                },
                { provide: ConfigService, useValue: config },
            ],
        }).compile();

        service = module.get(AccountService);
        jest.resetAllMocks();
        (hash as jest.Mock).mockResolvedValue('hashed-password');
        (getSessionMetadata as jest.Mock).mockReturnValue({ ip: '127.0.0.1' });
        (saveSession as jest.Mock).mockResolvedValue(undefined);
    });

    describe('create', () => {
        const input = {
            username: 'newuser',
            email: 'new@example.com',
            password: 'secret12',
        };

        it('throws when username already exists', async () => {
            prisma.user.findUnique
                .mockResolvedValueOnce({ id: 'existing' })
                .mockResolvedValueOnce(null);

            await expect(
                service.create(createRequest(), input, 'jest-agent'),
            ).rejects.toBeInstanceOf(ConflictException);
        });

        it('throws when email already exists', async () => {
            prisma.user.findUnique
                .mockResolvedValueOnce(null)
                .mockResolvedValueOnce({ id: 'existing' });

            await expect(
                service.create(createRequest(), input, 'jest-agent'),
            ).rejects.toBeInstanceOf(ConflictException);
        });

        it('creates user and sends verification email', async () => {
            const createdUser = {
                id: 'user-1',
                username: input.username,
                email: input.email,
            };

            prisma.user.findUnique.mockResolvedValue(null);
            prisma.user.create.mockResolvedValue(createdUser);
            statistics.getOrCreate.mockResolvedValue({});
            verificationService.sendVerificationToken.mockResolvedValue({
                success: true,
            });

            const req = createRequest();
            const result = await service.create(req, input, 'jest-agent');

            expect(result).toEqual({
                success: true,
                message: 'Аккаунт успешно создан',
            });
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: {
                    username: input.username,
                    email: input.email,
                    password: 'hashed-password',
                    nickname: input.username,
                },
            });
            expect(
                verificationService.sendVerificationToken,
            ).toHaveBeenCalledWith(createdUser);
            expect(statistics.getOrCreate).toHaveBeenCalledWith('user-1');
            expect(saveSession).toHaveBeenCalled();
        });
    });
});
