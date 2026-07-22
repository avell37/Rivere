import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { WsSessionService } from '@/shared/services/ws-session.service';

@Global()
@Module({
    providers: [RedisService, WsSessionService],
    exports: [RedisService, WsSessionService],
})
export class RedisModule {}
