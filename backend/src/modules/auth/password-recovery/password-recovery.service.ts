import { Injectable, NotAcceptableException } from '@nestjs/common';
import type { Request } from 'express';
import { ResetPasswordInput } from './inputs/reset-password.input';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '../token/token.service';
import { hash } from 'argon2';
import { CreateNewPasswordInput } from './inputs/create-new-password.input';
import { VerifyTokenInput } from './inputs/verify-token.input';
import { TokenType } from '@prisma/client';
import { MailService } from '@/modules/libs/mail/mail.service';
import { PrismaService } from '@/core/prisma/prisma.service';
import { getSessionMetadata } from '@/shared/utils/session-metadata.util';

@Injectable()
export class PasswordRecoveryService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mail: MailService,
        private readonly config: ConfigService,
        private readonly token: TokenService,
    ) {}

    public async resetPassword(
        req: Request,
        input: ResetPasswordInput,
        userAgent: string,
    ) {
        const { email } = input;

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new NotAcceptableException({
                code: 'user.notFound',
                message: 'Пользователь не найден',
            });
        }

        const resetToken = await this.token.generateToken(
            user,
            TokenType.PASSWORD_RESET,
        );

        const metadata = getSessionMetadata(req, userAgent, this.config);

        await this.mail.sendPasswordResetToken(
            user.email,
            resetToken.token,
            metadata,
        );

        return {
            success: true,
            message: 'Токен отправлен на почту',
        };
    }

    public async verifyResetToken(input: VerifyTokenInput) {
        const { token } = input;

        const existingToken = await this.prisma.token.findFirst({
            where: {
                token,
                type: TokenType.PASSWORD_RESET,
            },
        });

        if (!existingToken || !existingToken.userId) {
            throw new NotAcceptableException({
                code: 'token.notFound',
                message: 'Токен не найден',
            });
        }

        await this.token.verifyToken(
            existingToken.userId,
            token,
            TokenType.PASSWORD_RESET,
        );

        return {
            success: true,
            message: 'Токен подтвержден',
        };
    }

    public async createNewPassword(input: CreateNewPasswordInput) {
        const { token, newPassword } = input;

        const existingToken = await this.prisma.token.findFirst({
            where: {
                token,
                type: TokenType.PASSWORD_RESET,
            },
        });

        if (!existingToken || !existingToken.userId) {
            throw new NotAcceptableException({
                code: 'token.notFound',
                message: 'Неверный токен',
            });
        }

        await this.token.verifyToken(
            existingToken.userId,
            token,
            TokenType.PASSWORD_RESET,
        );

        const hashedPassword = await hash(newPassword);

        await this.prisma.user.update({
            where: { id: existingToken.userId },
            data: { password: hashedPassword },
        });

        await this.prisma.token.delete({
            where: { id: existingToken.id },
        });

        return {
            success: true,
            message: 'Пароль успешно изменен',
        };
    }
}
