import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Authorization()
    @Get()
    async getUserNotifications(@SessionUser('id') userId: string) {
        return this.notificationsService.getUserNotifications(userId);
    }

    @Authorization()
    @Patch('readAll')
    async readAllNotifications(@SessionUser('id') userId: string) {
        return this.notificationsService.readAllNotifications(userId);
    }

    @Authorization()
    @Delete()
    async clearNotifications(@SessionUser('id') userId: string) {
        return this.notificationsService.clearNotifications(userId);
    }
}
