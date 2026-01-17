import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { AchievementsModule } from '../achievements/achievements.module';

@Module({
    imports: [AchievementsModule],
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule {}
