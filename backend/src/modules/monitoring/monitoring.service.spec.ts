import { ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AdminService } from '@/modules/admin/admin.service';
import { PrismaService } from '@/core/prisma/prisma.service';
import { RedisService } from '@/core/redis/redis.service';

import { MonitoringService } from './monitoring.service';
import { SystemMetricsService } from './system-metrics.service';
import { TelegramService } from './telegram.service';

describe('MonitoringService', () => {
    const prisma = {
        $queryRaw: jest.fn(),
    };

    const redis = {
        ping: jest.fn(),
    };

    const adminService = {
        getAdminStats: jest.fn(),
    };

    const telegram = {
        isEnabled: jest.fn(),
        sendMessage: jest.fn(),
    };

    const configService = {
        get: jest.fn(),
    };

    let service: MonitoringService;

    beforeEach(() => {
        jest.clearAllMocks();

        service = new MonitoringService(
            prisma as unknown as PrismaService,
            redis as unknown as RedisService,
            adminService as unknown as AdminService,
            new SystemMetricsService(),
            telegram as unknown as TelegramService,
            configService as unknown as ConfigService,
        );
    });

    it('returns liveness payload', () => {
        const result = service.getLiveness();

        expect(result.status).toBe('ok');
        expect(result.timestamp).toBeDefined();
    });

    it('throws when readiness checks fail', async () => {
        prisma.$queryRaw.mockRejectedValue(new Error('db down'));
        redis.ping.mockRejectedValue(new Error('redis down'));

        await expect(service.getReadiness()).rejects.toBeInstanceOf(
            ServiceUnavailableException,
        );
    });

    it('builds daily report with stats and health', async () => {
        prisma.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);
        redis.ping.mockResolvedValue('PONG');
        adminService.getAdminStats.mockResolvedValue({
            users: { total: 10, today: 2 },
            boards: { total: 5, today: 1 },
            messages: { total: 100, today: 4 },
            completedCards: { total: 20, today: 3 },
            banned: { total: 1, today: 0 },
        });
        configService.get.mockReturnValue('https://rivere.ru');

        const report = await service.buildDailyReport();

        expect(report).toContain('Rivere — daily report');
        expect(report).toContain('Users: 10 (+2 today)');
        expect(report).toContain('Database: OK');
        expect(report).toContain('Memory:');
    });

    it('validates monitoring secret', () => {
        configService.get.mockReturnValue('secret-value');

        expect(service.isMonitoringSecretValid('secret-value')).toBe(true);
        expect(service.isMonitoringSecretValid('wrong')).toBe(false);
        expect(service.isMonitoringSecretValid(undefined)).toBe(false);
    });
});
