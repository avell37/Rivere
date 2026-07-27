import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    SocialProfile,
    SocialProviderHandler,
    YandexTokenResponse,
    YandexUserInfo,
} from '../types/social.types';
import { SocialProvider } from '../social-provider.enum';
import {
    getSocialCallbackUrl,
    getYandexClientId,
    getYandexClientSecret,
} from '../utils/oauth-config.util';

@Injectable()
export class YandexProvider implements SocialProviderHandler {
    private readonly logger = new Logger(YandexProvider.name);

    constructor(private readonly config: ConfigService) {}

    getAuthorizationUrl(state: string): string {
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: getYandexClientId(this.config),
            redirect_uri: getSocialCallbackUrl(this.config, SocialProvider.YANDEX),
            state,
            scope: 'login:info login:email login:avatar',
        });

        return `https://oauth.yandex.ru/authorize?${params.toString()}`;
    }

    async exchangeCodeForProfile(code: string): Promise<SocialProfile> {
        const redirectUri = getSocialCallbackUrl(
            this.config,
            SocialProvider.YANDEX,
        );

        const tokenResponse = await fetch('https://oauth.yandex.ru/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                client_id: getYandexClientId(this.config),
                client_secret: getYandexClientSecret(this.config),
                redirect_uri: redirectUri,
            }),
        });

        if (!tokenResponse.ok) {
            const errorBody = await tokenResponse.text();
            this.logger.error(
                `Yandex token exchange failed: ${tokenResponse.status} ${errorBody}`,
            );
            throw new Error('Yandex token exchange failed');
        }

        const tokenData = (await tokenResponse.json()) as YandexTokenResponse;

        const profileResponse = await fetch(
            'https://login.yandex.ru/info?format=json',
            {
                headers: {
                    Authorization: `OAuth ${tokenData.access_token}`,
                },
            },
        );

        if (!profileResponse.ok) {
            throw new Error('Yandex profile fetch failed');
        }

        const profile = (await profileResponse.json()) as YandexUserInfo;

        return {
            providerId: profile.id,
            login: profile.login,
            email: profile.default_email,
            displayName:
                profile.display_name ?? profile.real_name ?? profile.login,
            firstName: profile.first_name,
            lastName: profile.last_name,
            avatar: profile.default_avatar_id
                ? `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-200`
                : undefined,
        };
    }
}
