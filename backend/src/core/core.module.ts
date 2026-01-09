import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SessionModule } from '../modules/auth/session/session.module';
import { AccountModule } from '../modules/auth/account/account.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
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

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SessionModule,
        AccountModule,
        PrismaModule,
        RedisModule,
        BoardModule,
        ColumnModule,
        CardModule,
        ChatModule,
        MessagesModule,
        FilesModule,
        NotificationsModule,
        AchievementsModule,
        StatisticsModule,
    ],
})
export class CoreModule implements NestModule {
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
