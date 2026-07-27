import {
    Controller,
    Get,
    Logger,
    Param,
    Query,
    Req,
    Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { UserAgent } from '@/shared/decorators/user-agent.decorator';
import { SocialService } from './social.service';

@ApiTags('OAuth')
@Controller('auth/social')
export class SocialController {
    private readonly logger = new Logger(SocialController.name);

    constructor(private readonly socialService: SocialService) {}

    @ApiOperation({
        summary: 'Начать OAuth-авторизацию',
        description: 'Перенаправляет пользователя на страницу входа провайдера',
    })
    @Get(':provider')
    initiate(@Param('provider') provider: string, @Res() res: Response) {
        const authorizationUrl =
            this.socialService.getAuthorizationUrl(provider);

        return res.redirect(authorizationUrl);
    }

    @ApiOperation({
        summary: 'OAuth callback',
        description:
            'Обрабатывает ответ провайдера, создаёт сессию и перенаправляет на frontend',
    })
    @Get(':provider/callback')
    async callback(
        @Param('provider') provider: string,
        @Query('code') code: string | undefined,
        @Query('state') state: string | undefined,
        @Query('error') error: string | undefined,
        @Req() req: Request,
        @Res() res: Response,
        @UserAgent() userAgent: string,
    ) {
        if (error) {
            return res.redirect(
                this.socialService.getFrontendErrorRedirectUrl('oauth_denied'),
            );
        }

        try {
            await this.socialService.handleCallback(
                provider,
                code,
                state,
                req,
                userAgent,
            );

            return res.redirect(this.socialService.getFrontendRedirectUrl());
        } catch (error) {
            this.logger.error('OAuth callback failed', error);

            return res.redirect(
                this.socialService.getFrontendErrorRedirectUrl('oauth_failed'),
            );
        }
    }
}
