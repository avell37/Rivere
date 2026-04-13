import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import { VerificationTemplate } from './templates/verification.template';
import { SessionMetadata } from 'src/shared/types/session-metadata.types';
import { PasswordRecoveryTemplate } from './templates/password-recovery.template';

@Injectable()
export class MailService {
    public constructor(private readonly mailerService: MailerService) {}

    public async sendVerificationToken(email: string, token: string) {
        const html = await render(VerificationTemplate({ token }));

        return this.sendMail(email, 'Верификация аккаунта', html);
    }

    public async sendPasswordResetToken(
        email: string,
        token: string,
        metadata: SessionMetadata,
    ) {
        const html = await render(
            PasswordRecoveryTemplate({ token, metadata }),
        );

        return this.sendMail(email, 'Сброс пароля', html);
    }

    private async sendMail(email: string, subject: string, html: string) {
        const res = await this.mailerService.sendMail({
            to: email,
            subject,
            html,
        });

        return res;
    }
}
