import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateUserInput } from './inputs/create-user.input';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { ChangeUsernameInput } from './inputs/change-username.input';
import type { User } from '@prisma/client';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { ApiOperation } from '@nestjs/swagger';
import { ChangeDisplayUsernameInput } from './inputs/change-display-username.input';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @ApiOperation({
        summary: 'Получение пользователя по ID',
        description: 'Отдает авторизированного пользователя по ID',
    })
    @Authorization()
    @Get()
    async me(@SessionUser('id') id: string) {
        return this.accountService.me(id);
    }

    @ApiOperation({
        summary: 'Создание пользователя',
        description: 'Создает нового пользователя',
    })
    @HttpCode(200)
    @Post('create')
    async create(@Body() input: CreateUserInput) {
        return this.accountService.create(input);
    }

    @ApiOperation({
        summary: 'Изменение имени',
        description: 'Изменяет имя пользователя',
    })
    @HttpCode(200)
    @Authorization()
    @Post('changeUsername')
    async changeUsername(
        @Body() input: ChangeUsernameInput,
        @SessionUser() user: User,
    ) {
        return this.accountService.changeUsername(input, user);
    }

    @ApiOperation({
        summary: 'Изменение имени',
        description: 'Изменяет имя пользователя',
    })
    @HttpCode(200)
    @Authorization()
    @Post('changeDisplayUsername')
    async changeDisplayUsername(
        @Body() input: ChangeDisplayUsernameInput,
        @SessionUser() user: User,
    ) {
        return this.accountService.changeDisplayUsername(input, user);
    }

    @ApiOperation({
        summary: 'Изменение почты',
        description: 'Изменяет почту пользователя',
    })
    @HttpCode(200)
    @Authorization()
    @Post('changeEmail')
    async changeEmail(
        @Body() input: ChangeEmailInput,
        @SessionUser() user: User,
    ) {
        return this.accountService.changeEmail(input, user);
    }

    @ApiOperation({
        summary: 'Изменение пароля',
        description: 'Изменяет пароль пользователя',
    })
    @HttpCode(200)
    @Authorization()
    @Post('changePassword')
    async changePassword(
        @Body() input: ChangePasswordInput,
        @SessionUser() user: User,
    ) {
        return this.accountService.changePassword(input, user);
    }

    @ApiOperation({
        summary: 'Изменение пароля',
        description: 'Изменяет пароль пользователя',
    })
    @HttpCode(200)
    @Authorization()
    @Post('changeAvatar')
    @UseInterceptors(FileInterceptor('file'))
    async changeAvatar(
        @UploadedFile() file: Express.Multer.File,
        @SessionUser() user: User,
    ) {
        return this.accountService.changeAvatar(file, user);
    }
}
