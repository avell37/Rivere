import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { ChatService } from '../chat/chat.service';
import { StatisticsModule } from '../statistics/statistics.module';

@Module({
    imports: [StatisticsModule],
    controllers: [CardController],
    providers: [CardService, ChatService],
})
export class CardModule {}
