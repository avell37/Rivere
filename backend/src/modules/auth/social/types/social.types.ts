export interface SocialProfile {
    providerId: string;
    login?: string;
    email?: string;
    displayName?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
}

export interface SocialProviderHandler {
    getAuthorizationUrl(state: string): string;
    exchangeCodeForProfile(code: string): Promise<SocialProfile>;
}

export interface YandexTokenResponse {
    access_token: string;
    token_type: string;
}

export interface YandexUserInfo {
    id: string;
    login?: string;
    default_email?: string;
    display_name?: string;
    real_name?: string;
    first_name?: string;
    last_name?: string;
    default_avatar_id?: string;
    is_avatar_empty?: boolean;
}
