import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
    private readonly logger = new Logger(TelegramService.name);

    constructor(private readonly configService: ConfigService) {}

    isEnabled(): boolean {
        return Boolean(this.getBotToken() && this.getAllowedChatId());
    }

    getAllowedChatId(): string | undefined {
        const chatId = this.configService
            .get<string>('TELEGRAM_CHAT_ID')
            ?.trim();

        return chatId || undefined;
    }

    async sendMessage(text: string): Promise<boolean> {
        const botToken = this.getBotToken();
        const chatId = this.getAllowedChatId();

        if (!botToken || !chatId) {
            this.logger.debug('Telegram monitoring is disabled');
            return false;
        }

        try {
            const response = await fetch(
                `https://api.telegram.org/bot${botToken}/sendMessage`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text,
                        parse_mode: 'HTML',
                        disable_web_page_preview: true,
                    }),
                },
            );

            if (!response.ok) {
                const body = await response.text();
                this.logger.error(
                    `Telegram API error (${response.status}): ${body}`,
                );
                return false;
            }

            return true;
        } catch (error) {
            this.logger.error('Failed to send Telegram message', error);
            return false;
        }
    }

    isAllowedChatId(chatId: string | number): boolean {
        const allowedChatId = this.getAllowedChatId();

        if (!allowedChatId) {
            return false;
        }

        return String(chatId) === allowedChatId;
    }

    private getBotToken(): string | undefined {
        const token = this.configService
            .get<string>('TELEGRAM_BOT_TOKEN')
            ?.trim();

        return token || undefined;
    }
}
