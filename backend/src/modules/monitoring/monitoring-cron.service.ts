import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { MonitoringService } from './monitoring.service';
import { TelegramService } from './telegram.service';

@Injectable()
export class MonitoringCronService {
    private readonly logger = new Logger(MonitoringCronService.name);

    constructor(
        private readonly monitoringService: MonitoringService,
        private readonly telegram: TelegramService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_9AM)
    async sendDailyReport() {
        if (!this.telegram.isEnabled()) {
            return;
        }

        try {
            const sent = await this.monitoringService.sendDailyReport();

            if (sent) {
                this.logger.log('Daily monitoring report sent to Telegram');
            }
        } catch (error) {
            this.logger.error('Failed to send daily monitoring report', error);
        }
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async watchServiceHealth() {
        try {
            await this.monitoringService.checkHealthAndMaybeAlert();
        } catch (error) {
            this.logger.error('Health watch failed', error);
        }
    }
}
