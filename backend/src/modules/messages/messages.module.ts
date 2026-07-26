import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [NotificationsModule],
    providers: [MessagesService],
    exports: [MessagesService],
})
export class MessagesModule {}
