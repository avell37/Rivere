import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { MonitoringModule } from '@/modules/monitoring/monitoring.module';
import { MonitoringCronService } from '@/modules/monitoring/monitoring-cron.service';
import { NotificationsModule } from '../notifications/notifications.module';

import { CronService } from './cron.service';

@Module({
    imports: [ScheduleModule.forRoot(), NotificationsModule, MonitoringModule],
    providers: [CronService, MonitoringCronService],
})
export class CronModule {}
