import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import type { Request } from 'express';
import { ResetPasswordInput } from './inputs/reset-password.input';
import { VerifyTokenInput } from './inputs/verify-token.input';
import { CreateNewPasswordInput } from './inputs/create-new-password.input';
import { ApiOperation } from '@nestjs/swagger';
import { UserAgent } from '@/shared/decorators/user-agent.decorator';

@Controller('password-recovery')
export class PasswordRecoveryController {
    constructor(
        private readonly passwordRecoveryService: PasswordRecoveryService,
    ) {}

    @ApiOperation({
        summary: 'Сброс пароля',
        description:
            'Отправляет письмо с инструкциями по сбросу пароля, если пользователь с указанной почтой существует.',
    })
    @HttpCode(200)
    @Post('reset-password')
    async resetPassword(
        @Req() request: Request,
        @Body() input: ResetPasswordInput,
        @UserAgent() userAgent: string,
    ) {
        return this.passwordRecoveryService.resetPassword(
            request,
            input,
            userAgent,
        );
    }

    @ApiOperation({
        summary: 'Проверка токена сброса пароля',
        description: 'Проверяет действительность токена сброса пароля.',
    })
    @HttpCode(200)
    @Post('verify-reset-token')
    async verifyResetToken(@Body() input: VerifyTokenInput) {
        return this.passwordRecoveryService.verifyResetToken(input);
    }

    @ApiOperation({
        summary: 'Создание нового пароля',
        description:
            'Создает новый пароль для пользователя, если токен сброса пароля действителен.',
    })
    @HttpCode(200)
    @Post('create-new-password')
    async createNewPassword(@Body() input: CreateNewPasswordInput) {
        return this.passwordRecoveryService.createNewPassword(input);
    }
}
