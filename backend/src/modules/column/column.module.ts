import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { BoardModule } from '../board/board.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { AchievementsModule } from '../achievements/achievements.module';
import { CardModule } from '../card/card.module';

@Module({
    imports: [BoardModule, ActivityLogModule, AchievementsModule, CardModule],
    controllers: [ColumnController],
    providers: [ColumnService],
})
export class ColumnModule {}
