import { Module } from '@nestjs/common';

import { AdminModule } from '@/modules/admin/admin.module';
import { CoreModule } from '@/core/core.module';

import { MonitoringController } from './monitoring.controller';
import { MonitoringService } from './monitoring.service';
import { SystemMetricsService } from './system-metrics.service';
import { TelegramService } from './telegram.service';

@Module({
    imports: [CoreModule, AdminModule],
    controllers: [MonitoringController],
    providers: [MonitoringService, SystemMetricsService, TelegramService],
    exports: [MonitoringService, TelegramService],
})
export class MonitoringModule {}
