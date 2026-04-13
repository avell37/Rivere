import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { VerificationService } from './verification.service';
import type { Request } from 'express';
import { VerificationInput } from './inputs/verification.input';
import { UserAgent } from 'src/shared/decorators/user-agent.decorator';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import type { User } from '@prisma/client';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('verification')
export class VerificationController {
    constructor(private readonly verificationService: VerificationService) {}

    @ApiOperation({
        summary: 'Верификация аккаунта',
        description: 'Подтверждает почту пользователя по токену верификации.',
    })
    @HttpCode(200)
    @Authorization()
    @Post('verify-account')
    async verify(
        @Req() request: Request,
        @Body() input: VerificationInput,
        @SessionUser() user: User,
        @UserAgent() userAgent: string,
    ) {
        return this.verificationService.verify(request, input, user, userAgent);
    }

    @ApiOperation({
        summary: 'Отправка токена верификации',
        description:
            'Отправляет новый токен верификации на почту пользователя.',
    })
    @HttpCode(200)
    @Post('send-token')
    @Authorization()
    async sendVerificationToken(@SessionUser() user: User) {
        return this.verificationService.sendVerificationToken(user);
    }
}
