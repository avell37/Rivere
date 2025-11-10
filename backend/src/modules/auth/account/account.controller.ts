import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateUserInput } from './inputs/create-user.input';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { ChangeUsernameInput } from './inputs/change-username.input';
import type { User } from '@prisma/client';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Authorization()
    @Get()
    async me(@SessionUser('id') id: string) {
        return this.accountService.me(id);
    }

    @Post('create')
    async create(@Body() input: CreateUserInput) {
        return this.accountService.create(input);
    }

    @Authorization()
    @Post('changeUsername')
    async changeUsername(
        @Body() input: ChangeUsernameInput,
        @SessionUser() user: User,
    ) {
        return this.accountService.changeUsername(input, user);
    }

    @Authorization()
    @Post('changeUsername')
    async changeEmail(
        @Body() input: ChangeEmailInput,
        @SessionUser() user: User,
    ) {
        return this.accountService.changeEmail(input, user);
    }

    @Authorization()
    @Post('changeUsername')
    async changePassword(
        @Body() input: ChangePasswordInput,
        @SessionUser() user: User,
    ) {
        return this.accountService.changePassword(input, user);
    }
}
