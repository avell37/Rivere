import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SessionService } from './session.service';
import { LoginInput } from './inputs/login.input';
import type { Request } from 'express';
import { Authorization } from 'src/shared/decorators/authorization.decorator';

@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @Authorization()
    @Get()
    async findCurrentSession(@Req() req: Request) {
        return this.sessionService.findCurrentSession(req);
    }

    @Post('login')
    async login(@Req() req: Request, @Body() input: LoginInput) {
        return this.sessionService.login(req, input);
    }

    @Post()
    async logout(@Req() req: Request) {
        return this.sessionService.logout(req);
    }
}
