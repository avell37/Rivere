import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SessionModule } from '../modules/auth/session/session.module';
import { AccountModule } from '../modules/auth/account/account.module';
import { BoardModule } from 'src/modules/board/board.module';
import { ColumnModule } from 'src/modules/column/column.module';
import { CardModule } from 'src/modules/card/card.module';
import { ChatModule } from 'src/modules/chat/chat.module';
import { MessagesModule } from 'src/modules/messages/messages.module';
import { FilesModule } from 'src/modules/files/files.module';
import { SessionActivityMiddleware } from './middlewares/session-activity.middleware';
import { NotificationsModule } from 'src/modules/notifications/notifications.module';
import { AchievementsModule } from 'src/modules/achievements/achievements.module';
import { StatisticsModule } from 'src/modules/statistics/statistics.module';
import { BoardInvitesModule } from 'src/modules/board-invites/board-invites.module';
import { MailModule } from 'src/modules/libs/mail/mail.module';
import { VerificationModule } from 'src/modules/auth/verification/verification.module';
import { PasswordRecoveryModule } from 'src/modules/auth/password-recovery/password-recovery.module';
import { TokenModule } from 'src/modules/auth/token/token.module';
import { AdminModule } from 'src/modules/admin/admin.module';
import { CoreModule } from './core.module';

@Module({
    imports: [
        CoreModule,
        SessionModule,
        AccountModule,
        BoardModule,
        BoardInvitesModule,
        ColumnModule,
        CardModule,
        ChatModule,
        MessagesModule,
        FilesModule,
        NotificationsModule,
        AchievementsModule,
        StatisticsModule,
        MailModule,
        VerificationModule,
        PasswordRecoveryModule,
        TokenModule,
        AdminModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SessionActivityMiddleware)
            .forRoutes(
                'session',
                'account',
                'board',
                'column',
                'card',
                'chat',
                'messages',
            );
    }
}
