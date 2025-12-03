import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { ChatService } from '../chat/chat.service';

@Module({
    controllers: [CardController],
    providers: [CardService, ChatService],
})
export class CardModule {}
