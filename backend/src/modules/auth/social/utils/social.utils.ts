import { AuthProvider } from '@prisma/client';
import { SocialProvider } from '../social-provider.enum';

export const socialProviderToAuthProvider = (
    provider: SocialProvider,
): AuthProvider => {
    if (provider === SocialProvider.YANDEX) {
        return AuthProvider.YANDEX;
    }

    return AuthProvider.LOCAL;
};

export const getProviderIdField = (): 'yandexId' => 'yandexId';

export const buildFallbackEmail = (
    provider: SocialProvider,
    providerId: string,
): string => `${provider}_${providerId}@oauth.rivere.local`;

export const sanitizeUsernameBase = (value: string): string => {
    const normalized = value
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');

    return normalized.slice(0, 32);
};

export const buildUsernameBase = (
    profile: {
        login?: string;
        email?: string;
        displayName?: string;
        firstName?: string;
        lastName?: string;
    },
    provider: SocialProvider,
    providerId: string,
): string => {
    const candidates = [
        profile.login,
        profile.email?.split('@')[0],
        profile.displayName,
        [profile.firstName, profile.lastName].filter(Boolean).join('_'),
        `${provider}_${providerId}`,
    ];

    for (const candidate of candidates) {
        if (!candidate?.trim()) {
            continue;
        }

        const sanitized = sanitizeUsernameBase(candidate);

        if (sanitized.length >= 4) {
            return sanitized;
        }
    }

    return `${provider}_${providerId}`.slice(0, 32);
};
