import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { MonitoringService } from './monitoring.service';
import { TelegramService } from './telegram.service';

@Injectable()
export class MonitoringCronService {
    private readonly logger = new Logger(MonitoringCronService.name);

    constructor(
        private readonly monitoringService: MonitoringService,
        private readonly telegram: TelegramService,
    ) {}

    @Cron('0 9 * * *', { timeZone: 'Europe/Moscow' })
    async sendDailyReport() {
        if (!this.telegram.isEnabled()) {
            return;
        }

        try {
            const result = await this.monitoringService.sendDailyReport();

            if (result.success) {
                this.logger.log(
                    `Daily monitoring report sent to Telegram (message_id=${result.messageId})`,
                );
                return;
            }

            this.logger.warn(
                `Daily monitoring report was not delivered: ${result.error}`,
            );
        } catch (error) {
            this.logger.error('Failed to send daily monitoring report', error);
        }
    }

    @Cron('*/5 * * * *')
    async watchServiceHealth() {
        try {
            await this.monitoringService.checkHealthAndMaybeAlert();
        } catch (error) {
            this.logger.error('Health watch failed', error);
        }
    }
}
