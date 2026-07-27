import { NotAcceptableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { TokenType } from '@prisma/client';

jest.mock('../token/token.service', () => ({
    TokenService: class MockTokenService {},
}));

jest.mock('@/modules/libs/mail/mail.service', () => ({
    MailService: class MockMailService {},
}));

jest.mock('argon2', () => ({
    hash: jest.fn().mockResolvedValue('hashed-password'),
}));

jest.mock('@/shared/utils/session-metadata.util', () => ({
    getSessionMetadata: jest.fn(),
}));

import { PasswordRecoveryService } from './password-recovery.service';
import { PrismaService } from '@/core/prisma/prisma.service';
import { MailService } from '@/modules/libs/mail/mail.service';
import { TokenService } from '../token/token.service';
import { getSessionMetadata } from '@/shared/utils/session-metadata.util';

describe('PasswordRecoveryService', () => {
    let service: PasswordRecoveryService;

    const prisma = {
        user: {
            findUnique: jest.fn(),
            update: jest.fn(),
        },
        token: {
            findFirst: jest.fn(),
            delete: jest.fn(),
        },
    };

    const mail = {
        sendPasswordResetToken: jest.fn(),
    };

    const tokenService = {
        generateToken: jest.fn(),
        verifyToken: jest.fn(),
    };

    const config = {};

    const createRequest = () => ({}) as import('express').Request;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PasswordRecoveryService,
                { provide: PrismaService, useValue: prisma },
                { provide: MailService, useValue: mail },
                { provide: ConfigService, useValue: config },
                { provide: TokenService, useValue: tokenService },
            ],
        }).compile();

        service = module.get(PasswordRecoveryService);
        jest.clearAllMocks();
        (getSessionMetadata as jest.Mock).mockReturnValue({ ip: '127.0.0.1' });
    });

    describe('resetPassword', () => {
        it('throws when user is not found', async () => {
            prisma.user.findUnique.mockResolvedValue(null);

            await expect(
                service.resetPassword(
                    createRequest(),
                    { email: 'missing@example.com' },
                    'jest-agent',
                ),
            ).rejects.toBeInstanceOf(NotAcceptableException);
        });

        it('sends reset token email for existing user', async () => {
            const user = { id: 'user-1', email: 'user@example.com' };

            prisma.user.findUnique.mockResolvedValue(user);
            tokenService.generateToken.mockResolvedValue({ token: '123456' });
            mail.sendPasswordResetToken.mockResolvedValue(undefined);

            const result = await service.resetPassword(
                createRequest(),
                { email: user.email },
                'jest-agent',
            );

            expect(result.success).toBe(true);
            expect(tokenService.generateToken).toHaveBeenCalledWith(
                user,
                TokenType.PASSWORD_RESET,
            );
            expect(mail.sendPasswordResetToken).toHaveBeenCalledWith(
                user.email,
                '123456',
                { ip: '127.0.0.1' },
            );
        });
    });

    describe('verifyResetToken', () => {
        it('throws when token is missing', async () => {
            prisma.token.findFirst.mockResolvedValue(null);

            await expect(
                service.verifyResetToken({ token: '000000' }),
            ).rejects.toBeInstanceOf(NotAcceptableException);
        });

        it('verifies valid reset token', async () => {
            prisma.token.findFirst.mockResolvedValue({
                id: 'token-1',
                userId: 'user-1',
                token: '123456',
            });
            tokenService.verifyToken.mockResolvedValue(undefined);

            const result = await service.verifyResetToken({ token: '123456' });

            expect(result.success).toBe(true);
            expect(tokenService.verifyToken).toHaveBeenCalledWith(
                'user-1',
                '123456',
                TokenType.PASSWORD_RESET,
            );
        });
    });
});
