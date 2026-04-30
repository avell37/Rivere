import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { render } from '@react-email/components';
import { VerificationTemplate } from './templates/verification.template';
import { PasswordRecoveryTemplate } from './templates/password-recovery.template';
import { SentMessageInfo } from 'nodemailer';
import { SessionMetadata } from '@/shared/types/session-metadata.types';

@Injectable()
export class MailService {
    public constructor(private readonly mailerService: MailerService) {}

    public async sendVerificationToken(
        email: string,
        token: string,
    ): Promise<SentMessageInfo> {
        const html = await render(VerificationTemplate({ token }));

        return this.sendMail(email, 'Верификация аккаунта', html);
    }

    public async sendPasswordResetToken(
        email: string,
        token: string,
        metadata: SessionMetadata,
    ): Promise<SentMessageInfo> {
        const html = await render(
            PasswordRecoveryTemplate({ token, metadata }),
        );

        return this.sendMail(email, 'Сброс пароля', html);
    }

    private async sendMail(
        email: string,
        subject: string,
        html: string,
    ): Promise<SentMessageInfo> {
        return this.mailerService.sendMail({
            to: email,
            subject,
            html,
        });
    }
}
