import { Module } from '@nestjs/common';
import { BoardInvitesService } from './board-invites.service';
import { BoardInvitesController } from './board-invites.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [NotificationsModule],
    controllers: [BoardInvitesController],
    providers: [BoardInvitesService],
})
export class BoardInvitesModule {}
