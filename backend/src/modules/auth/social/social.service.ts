import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { hash } from 'argon2';
import { randomBytes, randomUUID } from 'node:crypto';
import type { Request } from 'express';
import { PrismaService } from '@/core/prisma/prisma.service';
import { RedisService } from '@/core/redis/redis.service';
import { StatisticsService } from '@/modules/statistics/statistics.service';
import { getSessionMetadata } from '@/shared/utils/session-metadata.util';
import { saveSession } from '@/shared/utils/session.util';
import { YandexProvider } from './providers/yandex.provider';
import { SocialProvider, isSocialProvider } from './social-provider.enum';
import { SocialProfile, SocialProviderHandler } from './types/social.types';
import {
    buildFallbackEmail,
    buildUsernameBase,
    getProviderIdField,
    socialProviderToAuthProvider,
} from './utils/social.utils';

const OAUTH_STATE_PREFIX = 'oauth:state:';
const OAUTH_STATE_TTL_SECONDS = 600;

@Injectable()
export class SocialService {
    private readonly logger = new Logger(SocialService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly redis: RedisService,
        private readonly config: ConfigService,
        private readonly statistics: StatisticsService,
        private readonly yandexProvider: YandexProvider,
    ) {}

    getAuthorizationUrl(providerName: string): Promise<string> {
        const provider = this.parseProvider(providerName);
        const state = randomUUID();
        const handler = this.getProviderHandler(provider);

        return this.redis
            .setex(
                `${OAUTH_STATE_PREFIX}${state}`,
                OAUTH_STATE_TTL_SECONDS,
                provider,
            )
            .then(() => handler.getAuthorizationUrl(state));
    }

    async handleCallback(
        providerName: string,
        code: string | undefined,
        state: string | undefined,
        req: Request,
        userAgent: string,
    ): Promise<void> {
        const provider = this.parseProvider(providerName);

        if (!code || !state) {
            throw new BadRequestException({
                code: 'errors.oauth.invalidCallback',
                message: 'Некорректный OAuth callback',
            });
        }

        await this.validateState(state, provider);

        const handler = this.getProviderHandler(provider);
        const profile = await handler.exchangeCodeForProfile(code);
        const user = await this.findOrCreateUser(profile, provider);

        this.ensureUserNotBanned(user);
        await this.createSession(req, user, userAgent);
    }

    private parseProvider(providerName: string): SocialProvider {
        if (!isSocialProvider(providerName)) {
            throw new BadRequestException({
                code: 'errors.oauth.unsupportedProvider',
                message: 'Неподдерживаемый OAuth-провайдер',
            });
        }

        return providerName;
    }

    private getProviderHandler(
        provider: SocialProvider,
    ): SocialProviderHandler {
        if (provider === SocialProvider.YANDEX) {
            return this.yandexProvider;
        }

        throw new InternalServerErrorException(
            'OAuth provider handler is not configured',
        );
    }

    private async validateState(
        state: string,
        provider: SocialProvider,
    ): Promise<void> {
        const key = `${OAUTH_STATE_PREFIX}${state}`;
        const storedProvider = await this.redis.get(key);

        if (
            !storedProvider ||
            !isSocialProvider(storedProvider) ||
            storedProvider !== provider
        ) {
            throw new BadRequestException({
                code: 'errors.oauth.invalidState',
                message: 'Недействительный OAuth state',
            });
        }

        await this.redis.del(key);
    }

    async findOrCreateUser(
        profile: SocialProfile,
        provider: SocialProvider,
    ): Promise<User> {
        const providerField = getProviderIdField();
        const authProvider = socialProviderToAuthProvider(provider);

        const existingByProvider = await this.prisma.user.findFirst({
            where: { [providerField]: profile.providerId },
        });

        if (existingByProvider) {
            return this.updateUserProfile(
                existingByProvider,
                profile,
                provider,
            );
        }

        const email =
            profile.email?.trim().toLowerCase() ??
            buildFallbackEmail(provider, profile.providerId);

        const existingByEmail = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingByEmail) {
            if (existingByEmail[providerField]) {
                throw new ConflictException({
                    code: 'errors.oauth.accountConflict',
                    message: 'Аккаунт уже привязан к другому профилю',
                });
            }

            return this.prisma.user.update({
                where: { id: existingByEmail.id },
                data: {
                    [providerField]: profile.providerId,
                    avatar: existingByEmail.avatar ?? profile.avatar,
                    nickname:
                        existingByEmail.nickname ||
                        this.buildNickname(profile, provider),
                },
            });
        }

        const username = await this.generateUniqueUsername(profile, provider);
        const nickname = this.buildNickname(profile, provider);

        return this.prisma.user.create({
            data: {
                username,
                email,
                password: await hash(randomBytes(32).toString('hex')),
                nickname,
                avatar: profile.avatar,
                authProvider,
                [providerField]: profile.providerId,
                isEmailVerified: Boolean(profile.email),
            },
        });
    }

    private async updateUserProfile(
        user: User,
        profile: SocialProfile,
        provider: SocialProvider,
    ): Promise<User> {
        const providerField = getProviderIdField();
        const upgradedUsername = await this.maybeUpgradeUsername(
            user,
            profile,
            provider,
        );

        return this.prisma.user.update({
            where: { id: user.id },
            data: {
                avatar: profile.avatar ?? user.avatar,
                nickname:
                    user.nickname || this.buildNickname(profile, provider),
                [providerField]: profile.providerId,
                isEmailVerified: user.isEmailVerified || Boolean(profile.email),
                ...(upgradedUsername ? { username: upgradedUsername } : {}),
            },
        });
    }

    private buildNickname(
        profile: SocialProfile,
        provider: SocialProvider,
    ): string {
        const nickname =
            profile.displayName?.trim() ||
            [profile.firstName, profile.lastName]
                .filter(Boolean)
                .join(' ')
                .trim();

        if (nickname) {
            return nickname.slice(0, 32);
        }

        return `${provider}_${profile.providerId}`.slice(0, 32);
    }

    private async generateUniqueUsername(
        profile: SocialProfile,
        provider: SocialProvider,
    ): Promise<string> {
        const base = buildUsernameBase(profile, provider, profile.providerId);
        let username = base;
        let suffix = 0;

        while (
            await this.prisma.user.findUnique({
                where: { username },
            })
        ) {
            suffix += 1;
            username = `${base.slice(0, 28)}_${suffix}`;
        }

        return username;
    }

    private async maybeUpgradeUsername(
        user: User,
        profile: SocialProfile,
        provider: SocialProvider,
    ): Promise<string | undefined> {
        if (user.username !== 'user_oauth') {
            return undefined;
        }

        const username = await this.generateUniqueUsername(profile, provider);

        return username === user.username ? undefined : username;
    }

    private ensureUserNotBanned(user: User): void {
        if (user.bannedUntil && new Date(user.bannedUntil) > new Date()) {
            throw new ForbiddenException({
                message: 'Пользователь заблокирован',
                code: 'errors.user.banned',
                bannedUntil: user.bannedUntil,
            });
        }
    }

    private async createSession(
        req: Request,
        user: User,
        userAgent: string,
    ): Promise<void> {
        const metadata = getSessionMetadata(req, userAgent, this.config);

        await this.statistics.getOrCreate(user.id);

        await new Promise<void>((resolve, reject) => {
            req.session.regenerate((err) => {
                if (err) {
                    reject(err instanceof Error ? err : new Error(String(err)));
                    return;
                }
                resolve();
            });
        });

        await saveSession(req, user, metadata, { config: this.config });
    }

    getFrontendRedirectUrl(path = '/boards'): string {
        const frontendUrl = this.config
            .getOrThrow<string>('ALLOWED_ORIGIN')
            .replace(/\/$/, '');

        return `${frontendUrl}${path.startsWith('/') ? path : `/${path}`}`;
    }

    getFrontendErrorRedirectUrl(errorCode: string): string {
        return this.getFrontendRedirectUrl(
            `/auth/login?error=${encodeURIComponent(errorCode)}`,
        );
    }
}
