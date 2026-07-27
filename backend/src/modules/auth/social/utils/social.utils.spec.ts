import {
    buildFallbackEmail,
    buildUsernameBase,
    sanitizeUsernameBase,
    socialProviderToAuthProvider,
} from './social.utils';
import { SocialProvider } from '../social-provider.enum';
import { AuthProvider } from '@prisma/client';

describe('social.utils', () => {
    it('maps yandex provider to auth provider', () => {
        expect(socialProviderToAuthProvider(SocialProvider.YANDEX)).toBe(
            AuthProvider.YANDEX,
        );
    });

    it('builds fallback email for oauth users without email', () => {
        expect(buildFallbackEmail(SocialProvider.YANDEX, '12345')).toBe(
            'yandex_12345@oauth.rivere.local',
        );
    });

    it('sanitizes latin username base', () => {
        expect(sanitizeUsernameBase('Alex User!')).toBe('alex_user');
    });

    it('prefers yandex login for username', () => {
        expect(
            buildUsernameBase(
                {
                    login: 'ivan37',
                    displayName: 'Иван',
                },
                SocialProvider.YANDEX,
                '12345',
            ),
        ).toBe('ivan37');
    });

    it('falls back to provider id for cyrillic-only profile', () => {
        expect(
            buildUsernameBase(
                {
                    displayName: 'Иван Петров',
                },
                SocialProvider.YANDEX,
                '12345',
            ),
        ).toBe('yandex_12345');
    });
});
