import { ConfigService } from '@nestjs/config';

import { parseTelegramSendResponse } from './telegram.types';
import { TelegramService } from './telegram.service';

describe('parseTelegramSendResponse', () => {
    it('accepts a valid Telegram success payload', () => {
        const result = parseTelegramSendResponse(
            200,
            JSON.stringify({ ok: true, result: { message_id: 42 } }),
        );

        expect(result).toEqual({ success: true, messageId: 42 });
    });

    it('rejects empty body', () => {
        const result = parseTelegramSendResponse(200, '');

        expect(result).toEqual({
            success: false,
            error: 'Empty Telegram API response (HTTP 200)',
        });
    });

    it('rejects non-json body', () => {
        const result = parseTelegramSendResponse(200, '<html>blocked</html>');

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error).toContain('not JSON');
        }
    });

    it('rejects Telegram API error payload', () => {
        const result = parseTelegramSendResponse(
            400,
            JSON.stringify({
                ok: false,
                error_code: 400,
                description: 'Bad Request: chat not found',
            }),
        );

        expect(result).toEqual({
            success: false,
            error: 'Telegram API error 400: Bad Request: chat not found',
        });
    });

    it('rejects ok=true without message_id', () => {
        const result = parseTelegramSendResponse(
            200,
            JSON.stringify({ ok: true, result: {} }),
        );

        expect(result).toEqual({
            success: false,
            error: 'Telegram API returned ok=true without message_id (HTTP 200)',
        });
    });
});

describe('TelegramService', () => {
    const createService = (env: Record<string, string | undefined>) => {
        const configService = {
            get: jest.fn((key: string) => env[key]),
        } as unknown as ConfigService;

        return new TelegramService(configService);
    };

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it('is disabled without env vars', () => {
        const service = createService({});

        expect(service.isEnabled()).toBe(false);
    });

    it('allows only configured chat id', () => {
        const service = createService({
            TELEGRAM_BOT_TOKEN: 'token',
            TELEGRAM_CHAT_ID: '123456',
        });

        expect(service.isAllowedChatId('123456')).toBe(true);
        expect(service.isAllowedChatId(123456)).toBe(true);
        expect(service.isAllowedChatId('999')).toBe(false);
    });

    it('returns message_id when Telegram accepts the message', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            status: 200,
            text: () =>
                Promise.resolve(
                    JSON.stringify({ ok: true, result: { message_id: 777 } }),
                ),
        } as Response);

        const service = createService({
            TELEGRAM_BOT_TOKEN: 'test-token',
            TELEGRAM_CHAT_ID: '777',
        });

        const result = await service.sendMessage('hello');

        expect(result).toEqual({ success: true, messageId: 777 });
    });

    it('returns explicit error for invalid Telegram response', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            status: 200,
            text: () => Promise.resolve(''),
        } as Response);

        const service = createService({
            TELEGRAM_BOT_TOKEN: 'test-token',
            TELEGRAM_CHAT_ID: '777',
        });

        const result = await service.sendMessage('hello');

        expect(result).toEqual({
            success: false,
            error: 'Empty Telegram API response (HTTP 200)',
        });
    });
});
