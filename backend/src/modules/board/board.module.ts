import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { AchievementsModule } from '../achievements/achievements.module';
import { BoardMembersModule } from './members/board-members.module';
import { BoardGateway } from './board.gateway';

@Module({
    imports: [AchievementsModule, BoardMembersModule],
    controllers: [BoardController],
    providers: [BoardGateway, BoardService],
    exports: [BoardGateway],
})
export class BoardModule {}
