import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { ChatService } from '../chat/chat.service';
import { StatisticsModule } from '../statistics/statistics.module';
import { AchievementsModule } from '../achievements/achievements.module';
import { CardGateway } from './card.gateway';

@Module({
    imports: [StatisticsModule, AchievementsModule],
    controllers: [CardController],
    providers: [CardService, ChatService, CardGateway],
})
export class CardModule {}
