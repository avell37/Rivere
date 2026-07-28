import { ConfigService } from '@nestjs/config';

import { TelegramService } from './telegram.service';

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

    it('sends message only to configured chat id', async () => {
        const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(''),
        } as Response);

        const service = createService({
            TELEGRAM_BOT_TOKEN: 'test-token',
            TELEGRAM_CHAT_ID: '777',
        });

        await service.sendMessage('hello');

        expect(fetchMock).toHaveBeenCalledWith(
            'https://api.telegram.org/bottest-token/sendMessage',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({
                    chat_id: '777',
                    text: 'hello',
                    parse_mode: 'HTML',
                    disable_web_page_preview: true,
                }),
            }),
        );
    });
});
