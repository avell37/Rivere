import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
    parseTelegramSendResponse,
    TelegramSendResult,
} from './telegram.types';

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

    async sendMessage(text: string): Promise<TelegramSendResult> {
        const botToken = this.getBotToken();
        const chatId = this.getAllowedChatId();

        if (!botToken || !chatId) {
            this.logger.debug('Telegram monitoring is disabled');
            return { success: false, error: 'Telegram monitoring is disabled' };
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

            const rawBody = await response.text();
            const result = parseTelegramSendResponse(response.status, rawBody);

            if (!result.success) {
                this.logger.error(
                    `Telegram send failed (HTTP ${response.status}): ${result.error}`,
                );
                return result;
            }

            this.logger.log(
                `Telegram message delivered (message_id=${result.messageId})`,
            );

            return result;
        } catch (error) {
            const message =
                error instanceof Error ? error.message : String(error);

            this.logger.error(`Telegram send failed: ${message}`, error);

            return {
                success: false,
                error: `Telegram request failed: ${message}`,
            };
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
