import { Module } from '@nestjs/common';
import { BoardInvitesService } from './board-invites.service';
import { BoardInvitesController } from './board-invites.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { AchievementsModule } from '../achievements/achievements.module';

@Module({
    imports: [NotificationsModule, ActivityLogModule, AchievementsModule],
    controllers: [BoardInvitesController],
    providers: [BoardInvitesService],
})
export class BoardInvitesModule {}
