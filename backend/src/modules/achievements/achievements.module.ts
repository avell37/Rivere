import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { AchievementsGateway } from './achievements.gateway';

@Module({
    controllers: [AchievementsController],
    providers: [AchievementsGateway, AchievementsService],
})
export class AchievementsModule {}
