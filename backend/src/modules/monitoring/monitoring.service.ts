import {
    Injectable,
    Logger,
    ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/core/prisma/prisma.service';
import { RedisService } from '@/core/redis/redis.service';
import { AdminService } from '@/modules/admin/admin.service';

import { SystemMetricsService } from './system-metrics.service';
import { TelegramService } from './telegram.service';
import { TelegramSendResult } from './telegram.types';

export type DependencyHealth = {
    database: 'up' | 'down';
    redis: 'up' | 'down';
};

export type ReadinessResult = {
    status: 'ok' | 'degraded';
    checks: DependencyHealth;
    timestamp: string;
};

@Injectable()
export class MonitoringService {
    private readonly logger = new Logger(MonitoringService.name);
    private lastAlertAt = 0;

    constructor(
        private readonly prisma: PrismaService,
        private readonly redis: RedisService,
        private readonly adminService: AdminService,
        private readonly systemMetrics: SystemMetricsService,
        private readonly telegram: TelegramService,
        private readonly configService: ConfigService,
    ) {}

    getLiveness() {
        return {
            status: 'ok' as const,
            timestamp: new Date().toISOString(),
        };
    }

    async getReadiness(): Promise<ReadinessResult> {
        const checks = await this.checkDependencies();
        const isHealthy = checks.database === 'up' && checks.redis === 'up';

        const result: ReadinessResult = {
            status: isHealthy ? 'ok' : 'degraded',
            checks,
            timestamp: new Date().toISOString(),
        };

        if (!isHealthy) {
            throw new ServiceUnavailableException(result);
        }

        return result;
    }

    async checkDependencies(): Promise<DependencyHealth> {
        const checks: DependencyHealth = {
            database: 'down',
            redis: 'down',
        };

        try {
            await this.prisma.$queryRaw`SELECT 1`;
            checks.database = 'up';
        } catch {
            checks.database = 'down';
        }

        try {
            const pong = await this.redis.ping();
            checks.redis = pong === 'PONG' ? 'up' : 'down';
        } catch {
            checks.redis = 'down';
        }

        return checks;
    }

    async buildDailyReport(): Promise<string> {
        const [checks, stats, metrics] = await Promise.all([
            this.checkDependencies(),
            this.adminService.getAdminStats(),
            Promise.resolve(this.systemMetrics.getMetrics()),
        ]);

        const siteUrl =
            this.configService.get<string>('MONITORING_SITE_URL')?.trim() ||
            'https://rivere.ru';
        const isHealthy = checks.database === 'up' && checks.redis === 'up';
        const statusEmoji = isHealthy ? '✅' : '⚠️';

        return [
            `<b>${statusEmoji} Rivere — daily report</b>`,
            `<i>${this.formatDate(new Date())}</i>`,
            '',
            `<b>Availability</b>`,
            `Site: ${this.escapeHtml(siteUrl)}`,
            `API: ${isHealthy ? 'OK' : 'DEGRADED'}`,
            `Database: ${checks.database === 'up' ? 'OK' : 'DOWN'}`,
            `Redis: ${checks.redis === 'up' ? 'OK' : 'DOWN'}`,
            '',
            `<b>Product stats</b>`,
            `Users: ${stats.users.total} (+${stats.users.today} today)`,
            `Boards: ${stats.boards.total} (+${stats.boards.today} today)`,
            `Messages: ${stats.messages.total} (+${stats.messages.today} today)`,
            `Completed cards: ${stats.completedCards.total} (+${stats.completedCards.today} today)`,
            `Banned now: ${stats.banned.total} (+${stats.banned.today} today)`,
            '',
            `<b>Server</b>`,
            `Host uptime: ${this.systemMetrics.formatUptime(metrics.hostUptimeSeconds)}`,
            `Process uptime: ${this.systemMetrics.formatUptime(metrics.processUptimeSeconds)}`,
            `Memory: ${metrics.memoryUsedMb}/${metrics.memoryTotalMb} MB (${metrics.memoryUsedPercent}%)`,
            `Load avg: ${metrics.loadAverage.join(', ')}`,
            `Node: ${this.escapeHtml(metrics.nodeVersion)} (${this.escapeHtml(metrics.platform)})`,
        ].join('\n');
    }

    async sendDailyReport(): Promise<TelegramSendResult> {
        if (!this.telegram.isEnabled()) {
            return { success: false, error: 'Telegram monitoring is disabled' };
        }

        const report = await this.buildDailyReport();

        return this.sendTelegramWithRetry(
            () => this.telegram.sendMessage(report),
            'Daily monitoring report',
        );
    }

    private async sendTelegramWithRetry(
        send: () => Promise<TelegramSendResult>,
        label: string,
    ): Promise<TelegramSendResult> {
        const maxAttempts = this.getDailyReportMaxAttempts();
        const delayMs = this.getDailyReportRetryDelayMs();
        let lastResult: TelegramSendResult = {
            success: false,
            error: `${label} was not attempted`,
        };

        for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
            lastResult = await send();

            if (lastResult.success) {
                if (attempt > 1) {
                    this.logger.log(
                        `${label} delivered on attempt ${attempt}/${maxAttempts}`,
                    );
                }

                return lastResult;
            }

            this.logger.warn(
                `${label} attempt ${attempt}/${maxAttempts} failed: ${lastResult.error}`,
            );

            if (attempt < maxAttempts) {
                await this.delay(delayMs);
            }
        }

        return lastResult;
    }

    private getDailyReportMaxAttempts(): number {
        const configured = Number(
            this.configService.get<string>(
                'MONITORING_DAILY_REPORT_MAX_ATTEMPTS',
            ),
        );

        if (Number.isFinite(configured) && configured >= 1) {
            return Math.floor(configured);
        }

        return 5;
    }

    private getDailyReportRetryDelayMs(): number {
        const configured = Number(
            this.configService.get<string>(
                'MONITORING_DAILY_REPORT_RETRY_DELAY_MS',
            ),
        );

        if (Number.isFinite(configured) && configured >= 0) {
            return configured;
        }

        return 60_000;
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    async checkHealthAndMaybeAlert(): Promise<void> {
        if (!this.telegram.isEnabled()) {
            return;
        }

        const checks = await this.checkDependencies();
        const isHealthy = checks.database === 'up' && checks.redis === 'up';

        if (isHealthy) {
            this.lastAlertAt = 0;
            return;
        }

        const cooldownMs = this.getAlertCooldownMs();
        const now = Date.now();

        if (this.lastAlertAt && now - this.lastAlertAt < cooldownMs) {
            return;
        }

        const failedChecks = Object.entries(checks)
            .filter(([, status]) => status === 'down')
            .map(([name]) => name)
            .join(', ');

        const alertResult = await this.telegram.sendMessage(
            [
                '<b>🚨 Rivere alert</b>',
                '',
                'Service health check failed.',
                `Failed checks: <code>${this.escapeHtml(failedChecks)}</code>`,
                `Time: <i>${this.escapeHtml(this.formatDate(new Date()))}</i>`,
            ].join('\n'),
        );

        if (alertResult.success) {
            this.lastAlertAt = now;
            return;
        }

        this.logger.warn(
            `Health alert was not delivered to Telegram: ${alertResult.error}`,
        );
    }

    isMonitoringSecretValid(secret: string | undefined): boolean {
        const expected = this.configService
            .get<string>('MONITORING_SECRET')
            ?.trim();

        if (!expected) {
            return false;
        }

        return Boolean(secret && secret === expected);
    }

    private getAlertCooldownMs(): number {
        const configured = Number(
            this.configService.get<string>('MONITORING_ALERT_COOLDOWN_MS'),
        );

        if (Number.isFinite(configured) && configured > 0) {
            return configured;
        }

        return 30 * 60 * 1000;
    }

    private formatDate(date: Date): string {
        return date.toLocaleString('ru-RU', {
            timeZone: 'Europe/Moscow',
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    }

    private escapeHtml(value: string): string {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
}
