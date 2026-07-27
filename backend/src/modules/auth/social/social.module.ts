import { Module } from '@nestjs/common';
import { StatisticsModule } from '@/modules/statistics/statistics.module';
import { YandexProvider } from './providers/yandex.provider';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';

@Module({
    imports: [StatisticsModule],
    controllers: [SocialController],
    providers: [SocialService, YandexProvider],
    exports: [SocialService],
})
export class SocialModule {}
