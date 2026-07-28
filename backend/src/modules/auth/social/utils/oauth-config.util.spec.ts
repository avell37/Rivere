import { ConfigService } from '@nestjs/config';
import { SocialProvider } from '../social-provider.enum';
import { getSocialCallbackUrl, getYandexClientId } from './oauth-config.util';

describe('oauth-config.util', () => {
    const createConfig = (values: Record<string, string | undefined>) =>
        ({
            get: (key: string) => values[key],
        }) as ConfigService;

    it('uses explicit Yandex callback url when provided', () => {
        expect(
            getSocialCallbackUrl(
                createConfig({
                    YANDEX_CALLBACK_URL:
                        'https://rivere.ru/api/auth/social/yandex/callback',
                    ALLOWED_ORIGIN: 'https://rivere.ru',
                }),
                SocialProvider.YANDEX,
            ),
        ).toBe('https://rivere.ru/api/auth/social/yandex/callback');
    });

    it('derives callback url from ALLOWED_ORIGIN when callback env is missing', () => {
        expect(
            getSocialCallbackUrl(
                createConfig({
                    ALLOWED_ORIGIN: 'https://rivere.ru',
                }),
                SocialProvider.YANDEX,
            ),
        ).toBe('https://rivere.ru/api/auth/social/yandex/callback');
    });

    it('throws when oauth client id is missing', () => {
        expect(() => getYandexClientId(createConfig({}))).toThrow(
            'YANDEX_CLIENT_ID is missing',
        );
    });
});
