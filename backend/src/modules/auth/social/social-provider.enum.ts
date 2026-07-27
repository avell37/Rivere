export enum SocialProvider {
    YANDEX = 'yandex',
}

export const SOCIAL_PROVIDERS = Object.values(SocialProvider);

export const isSocialProvider = (value: string): value is SocialProvider =>
    SOCIAL_PROVIDERS.includes(value as SocialProvider);
