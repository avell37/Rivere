import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Post,
    Req,
    UnauthorizedException,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { LoginInput } from './inputs/login.input';
import type { Request } from 'express';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @ApiOperation({
        summary: 'Найти текущую сессию',
        description: 'Отдает текущую сессию пользователя',
    })
    @Authorization()
    @Get()
    async findCurrentSession(@Req() req: Request) {
        return this.sessionService.findCurrentSession(req);
    }

    @Authorization()
    @Get('userSessions')
    async findAllUserSessions(@Req() req: Request) {
        if (!req.session.userId) {
            throw new UnauthorizedException();
        }
        return this.sessionService.findAllUserSessions(
            req.session.userId,
            req.session.id,
        );
    }

    @Authorization()
    @Post('terminate/:sessionId')
    async terminateSession(
        @Req() req: Request,
        @Param('sessionId') sessionId: string,
    ) {
        if (!req.session.userId) {
            throw new UnauthorizedException('Отказано в доступе');
        }

        return this.sessionService.terminateSession(
            sessionId,
            req.session.userId,
            req.session.id,
        );
    }

    @Authorization()
    @Post('terminateAll')
    async terminateAll(@Req() req: Request) {
        if (!req.session.userId) {
            throw new UnauthorizedException('Отказано в доступе');
        }

        return this.sessionService.terminateAllExceptCurrent(
            req.session.userId,
            req.session.id,
        );
    }

    @ApiOperation({
        summary: 'Вход в систему',
        description: 'Выдает сессию-токен для входа пользователя',
    })
    @HttpCode(200)
    @Post('login')
    async login(@Req() req: Request, @Body() input: LoginInput) {
        return this.sessionService.login(req, input);
    }

    @ApiOperation({
        summary: 'Выход из системы',
        description: 'Удаляет сессию-токен для выхода из системы',
    })
    @HttpCode(200)
    @Post()
    async logout(@Req() req: Request) {
        return this.sessionService.logout(req);
    }
}
