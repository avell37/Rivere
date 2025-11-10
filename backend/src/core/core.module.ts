import { Module } from '@nestjs/common';
import { SessionModule } from '../modules/auth/session/session.module';
import { AccountModule } from '../modules/auth/account/account.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { BoardModule } from 'src/modules/board/board.module';

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
    ],
})
export class CoreModule {}
