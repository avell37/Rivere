import { PrismaService } from '@/core/prisma/prisma.service';
import { formatDay, getYesterday } from '@/shared/utils/date.util';
import { Injectable } from '@nestjs/common';
import { AchievementsService } from '../achievements/achievements.service';

@Injectable()
export class StatisticsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly achievements: AchievementsService,
    ) {}

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

        const prevStreak = stats.currentStreakDays || 0;

        if (prevStreak < 7 && currentStreak >= 7) {
            await this.achievements.updateAchievementProgress(
                userId,
                'weekStreak',
                7,
            );
        }

        if (prevStreak < 30 && currentStreak >= 30) {
            await this.achievements.updateAchievementProgress(
                userId,
                'monthStreak',
                30,
            );
        }
    }
}
