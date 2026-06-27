import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { AchievementsModule } from '../achievements/achievements.module';
import { BoardMembersModule } from './members/board-members.module';
import { BoardGateway } from './board.gateway';
import { ActivityLogModule } from '../activity-log/activity-log.module';

@Module({
    imports: [AchievementsModule, BoardMembersModule, ActivityLogModule],
    controllers: [BoardController],
    providers: [BoardGateway, BoardService],
    exports: [BoardGateway],
})
export class BoardModule {}
