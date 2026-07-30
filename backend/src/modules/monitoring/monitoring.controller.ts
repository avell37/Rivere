import {
    Controller,
    Get,
    Headers,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MonitoringService } from './monitoring.service';

@ApiTags('Monitoring')
@SkipThrottle()
@Controller()
export class MonitoringController {
    constructor(private readonly monitoringService: MonitoringService) {}

    @ApiOperation({
        summary: 'Liveness probe',
        description:
            'Returns 200 when the API process is running. Safe for public uptime checks.',
    })
    @Get('health')
    getHealth() {
        return this.monitoringService.getLiveness();
    }

    @ApiOperation({
        summary: 'Readiness probe',
        description:
            'Checks database and Redis connectivity. Returns 503 when dependencies are unavailable.',
    })
    @Get('ready')
    getReadiness() {
        return this.monitoringService.getReadiness();
    }

    @ApiOperation({
        summary: 'Send monitoring report to Telegram',
        description:
            'Protected by X-Monitoring-Secret header. Disabled unless MONITORING_SECRET is configured.',
    })
    @Post('monitoring/report')
    async sendReport(@Headers('x-monitoring-secret') secret?: string) {
        if (!this.monitoringService.isMonitoringSecretValid(secret)) {
            throw new UnauthorizedException();
        }

        const result = await this.monitoringService.sendDailyReport();

        return {
            sent: result.success,
            messageId: result.success ? result.messageId : undefined,
            error: result.success ? undefined : result.error,
            timestamp: new Date().toISOString(),
        };
    }
}
