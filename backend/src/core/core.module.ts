import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { EventsGateway } from './events.gateway';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottlerGuard } from '@/shared/guards/custom-throttler.guard';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ThrottlerModule.forRoot([
            {
                name: 'default',
                ttl: 60000,
                limit: 120,
            },
        ]),
        PrismaModule,
        RedisModule,
    ],
    providers: [
        EventsGateway,
        {
            provide: APP_GUARD,
            useClass: CustomThrottlerGuard,
        },
    ],
    exports: [EventsGateway, PrismaModule, RedisModule],
})
export class CoreModule {}
