import { Controller, Delete, Get, HttpCode, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiOperation } from '@nestjs/swagger';
import { Authorization } from '@/shared/decorators/authorization.decorator';
import { SessionUser } from '@/shared/decorators/session-user.decorator';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @ApiOperation({
        summary: 'Получение уведомлений пользователя',
        description: 'Отдает все имеющиеся уведомления пользователя',
    })
    @Authorization()
    @Get()
    async getUserNotifications(@SessionUser('id') userId: string) {
        return this.notificationsService.getUserNotifications(userId);
    }

    @ApiOperation({
        summary: 'Чтение всех уведомлений пользователя',
        description: 'Отмечает прочитанным все уведмоления пользователя',
    })
    @HttpCode(200)
    @Authorization()
    @Patch('readAll')
    async readAllNotifications(@SessionUser('id') userId: string) {
        return this.notificationsService.readAllNotifications(userId);
    }

    @ApiOperation({
        summary: 'Очистка всех уведомлений пользователя',
        description: 'Удаляет все уведмоления пользователя',
    })
    @HttpCode(200)
    @Authorization()
    @Delete()
    async clearNotifications(@SessionUser('id') userId: string) {
        return this.notificationsService.clearNotifications(userId);
    }
}
