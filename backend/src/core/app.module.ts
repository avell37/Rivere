import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SessionModule } from '../modules/auth/session/session.module';
import { AccountModule } from '../modules/auth/account/account.module';
import { CoreModule } from './core.module';
import { BoardModule } from '@/modules/board/board.module';
import { BoardInvitesModule } from '@/modules/board-invites/board-invites.module';
import { ColumnModule } from '@/modules/column/column.module';
import { CardModule } from '@/modules/card/card.module';
import { ChatModule } from '@/modules/chat/chat.module';
import { MessagesModule } from '@/modules/messages/messages.module';
import { FilesModule } from '@/modules/files/files.module';
import { NotificationsModule } from '@/modules/notifications/notifications.module';
import { AchievementsModule } from '@/modules/achievements/achievements.module';
import { StatisticsModule } from '@/modules/statistics/statistics.module';
import { MailModule } from '@/modules/libs/mail/mail.module';
import { VerificationModule } from '@/modules/auth/verification/verification.module';
import { PasswordRecoveryModule } from '@/modules/auth/password-recovery/password-recovery.module';
import { TokenModule } from '@/modules/auth/token/token.module';
import { AdminModule } from '@/modules/admin/admin.module';
import { SessionActivityMiddleware } from './middlewares/session-activity.middleware';
import { CronModule } from '@/modules/cron/cron.module';

@Module({
    imports: [
        AdminModule,
        AccountModule,
        AchievementsModule,
        BoardModule,
        BoardInvitesModule,
        CoreModule,
        ColumnModule,
        CronModule,
        CardModule,
        ChatModule,
        FilesModule,
        MailModule,
        MessagesModule,
        NotificationsModule,
        PasswordRecoveryModule,
        StatisticsModule,
        SessionModule,
        TokenModule,
        VerificationModule,
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
