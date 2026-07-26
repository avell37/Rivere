import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from '../messages/messages.module';
import { AchievementsModule } from '../achievements/achievements.module';

@Module({
    imports: [MessagesModule, AchievementsModule],
    providers: [ChatGateway, ChatService],
    exports: [ChatService, ChatGateway],
})
export class ChatModule {}
