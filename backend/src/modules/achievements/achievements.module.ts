import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { AchievementsGateway } from './achievements.gateway';
import { NotificationsModule } from '../notifications/notifications.module';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
    imports: [NotificationsModule],
    controllers: [AchievementsController],
    providers: [AchievementsGateway, AchievementsService, NotificationsService],
    exports: [AchievementsService],
})
export class AchievementsModule {}
