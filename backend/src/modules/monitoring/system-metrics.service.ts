import { Injectable } from '@nestjs/common';
import os from 'os';

export type SystemMetrics = {
    hostUptimeSeconds: number;
    processUptimeSeconds: number;
    memoryTotalMb: number;
    memoryUsedMb: number;
    memoryUsedPercent: number;
    loadAverage: string[];
    nodeVersion: string;
    platform: string;
};

@Injectable()
export class SystemMetricsService {
    getMetrics(): SystemMetrics {
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;

        return {
            hostUptimeSeconds: Math.round(os.uptime()),
            processUptimeSeconds: Math.round(process.uptime()),
            memoryTotalMb: Math.round(totalMem / 1024 / 1024),
            memoryUsedMb: Math.round(usedMem / 1024 / 1024),
            memoryUsedPercent: Math.round((usedMem / totalMem) * 100),
            loadAverage: os.loadavg().map((value) => value.toFixed(2)),
            nodeVersion: process.version,
            platform: `${os.platform()} ${os.arch()}`,
        };
    }

    formatUptime(seconds: number): string {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (days > 0) {
            return `${days}d ${hours}h`;
        }

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }

        return `${minutes}m`;
    }
}
