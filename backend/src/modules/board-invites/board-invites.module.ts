import { Module } from '@nestjs/common';
import { BoardInvitesService } from './board-invites.service';
import { BoardInvitesController } from './board-invites.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';

@Module({
    imports: [NotificationsModule, ActivityLogModule],
    controllers: [BoardInvitesController],
    providers: [BoardInvitesService],
})
export class BoardInvitesModule {}
