import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MessagesService } from '../messages/messages.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { AchievementsModule } from '../achievements/achievements.module';

@Module({
    imports: [NotificationsModule, AchievementsModule],
    providers: [ChatGateway, ChatService, MessagesService],
    exports: [ChatService],
})
export class ChatModule {}
