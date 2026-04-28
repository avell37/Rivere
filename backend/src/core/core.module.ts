import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { EventsGateway } from './events.gateway';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        RedisModule,
    ],
    providers: [EventsGateway],
    exports: [EventsGateway, PrismaModule, RedisModule],
})
export class CoreModule {}
