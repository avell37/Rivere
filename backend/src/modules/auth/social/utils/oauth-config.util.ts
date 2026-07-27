import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';
import { SocialProvider } from '../social-provider.enum';

export const getSocialCallbackUrl = (
    config: ConfigService,
    provider: SocialProvider,
): string => {
    if (provider === SocialProvider.YANDEX) {
        const explicit = config.get<string>('YANDEX_CALLBACK_URL');
        if (explicit) {
            return explicit;
        }
    }

    const origin = config.get<string>('ALLOWED_ORIGIN')?.replace(/\/$/, '');
    if (!origin) {
        throw new InternalServerErrorException(
            'OAuth is not configured: set YANDEX_CALLBACK_URL or ALLOWED_ORIGIN',
        );
    }

    return `${origin}/api/auth/social/${provider}/callback`;
};

export const getYandexClientId = (config: ConfigService): string => {
    const clientId = config.get<string>('YANDEX_CLIENT_ID');
    if (!clientId) {
        throw new InternalServerErrorException(
            'OAuth is not configured: YANDEX_CLIENT_ID is missing',
        );
    }

    return clientId;
};

export const getYandexClientSecret = (config: ConfigService): string => {
    const clientSecret = config.get<string>('YANDEX_CLIENT_SECRET');
    if (!clientSecret) {
        throw new InternalServerErrorException(
            'OAuth is not configured: YANDEX_CLIENT_SECRET is missing',
        );
    }

    return clientSecret;
};
