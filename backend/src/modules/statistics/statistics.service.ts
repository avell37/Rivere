import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { formatDay, getYesterday } from 'src/shared/utils/date.util';

@Injectable()
export class StatisticsService {
    constructor(private readonly prisma: PrismaService) {}

    async getOrCreate(userId: string) {
        return this.prisma.userStats.upsert({
            where: { userId },
            update: {},
            create: { userId },
        });
    }

    async onCardCompleted(userId: string) {
        const stats = await this.getOrCreate(userId);

        const today = formatDay(new Date());
        const yesterday = formatDay(getYesterday());
        const daily =
            (stats.dailyCompletedCards as Record<string, number>) ?? {};

        daily[today] = (daily[today] ?? 0) + 1;

        let currentStreak = stats.currentStreakDays || 0;

        if (!stats.lastActiveDate) {
            currentStreak = 1;
        } else {
            const lastDay = formatDay(stats.lastActiveDate);

            if (lastDay === yesterday) {
                currentStreak += 1;
            } else if (lastDay !== today) {
                currentStreak = 1;
            }
        }

        await this.prisma.userStats.update({
            where: { userId },
            data: {
                totalCompletedCards: stats.totalCompletedCards + 1,
                dailyCompletedCards: daily,
                currentStreakDays: currentStreak,
                longestStreakDays: Math.max(
                    currentStreak,
                    stats.longestStreakDays,
                ),
                lastActiveDate: new Date(),
            },
        });
    }
}
