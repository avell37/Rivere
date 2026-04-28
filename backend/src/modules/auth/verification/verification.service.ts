import { Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { MailService } from 'src/modules/libs/mail/mail.service';
import { VerificationInput } from './inputs/verification.input';
import { saveSession } from 'src/shared/utils/session.util';
import { getSessionMetadata } from 'src/shared/utils/session-metadata.util';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '../token/token.service';
import { TokenType, User } from '@prisma/client';

@Injectable()
export class VerificationService {
    public constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
        private readonly token: TokenService,
    ) {}

    public async verify(
        req: Request,
        input: VerificationInput,
        user: User,
        userAgent: string,
    ) {
        const { token } = input;

        const existingToken = await this.token.verifyToken(
            user.id,
            token,
            TokenType.EMAIL_VERIFY,
        );

        await this.prisma.token.delete({
            where: { id: existingToken.id },
        });

        const updatedUser = await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                isEmailVerified: true,
            },
        });

        const metadata = getSessionMetadata(req, userAgent, this.configService);

        return saveSession(req, updatedUser, metadata);
    }

    public async sendVerificationToken(user: User) {
        const verificationToken = await this.token.generateToken(
            user,
            TokenType.EMAIL_VERIFY,
        );

        await this.mailService.sendVerificationToken(
            user.email,
            verificationToken.token,
        );

        return true;
    }
}
