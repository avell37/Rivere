import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { AchievementsGateway } from './achievements.gateway';
import { CreateAchievementInput } from './inputs/create-achievement.input';
import { UpdateAchievementInput } from './inputs/update-achievement.input';
import { NotificationsService } from '../notifications/notifications.service';
import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class AchievementsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly achievementsGateway: AchievementsGateway,
        private readonly notificationsService: NotificationsService,
    ) {}

    async createAchievement(input: CreateAchievementInput) {
        const exists = await this.prisma.achievement.findUnique({
            where: {
                code: input.code,
            },
        });

        if (exists) {
            throw new BadRequestException({
                code: 'errors.achievements.exists',
                message: 'Достижение с таким кодом уже существует.',
            });
        }

        return this.prisma.achievement.create({
            data: {
                code: input.code,
                title: input.title,
                description: input.description,
                goal: input.goal,
            },
        });
    }

    async findAllAchievements(userId: string) {
        const achievements = await this.prisma.achievement.findMany({
            orderBy: { createdAt: 'asc' },
            include: {
                progresses: {
                    where: { userId },
                    select: { progress: true },
                    take: 1,
                },
                users: {
                    where: { userId },
                    select: { achievedAt: true },
                    take: 1,
                },
            },
        });

        return achievements.map((ach) => ({
            id: ach.id,
            code: ach.code,
            goal: ach.goal,
            progress: ach.progresses[0]?.progress ?? 0,
            achievedAt: ach.users[0]?.achievedAt ?? null,
            createdAt: ach.createdAt,
            updatedAt: ach.updatedAt,
        }));
    }

    async updateAchievement(input: UpdateAchievementInput) {
        const { id, title, description } = input;
        const achievement = await this.prisma.achievement.findUnique({
            where: { id },
        });

        if (!achievement) {
            throw new NotFoundException({
                code: 'errors.creator.achievements.notFound',
                message: 'Достижение не найдено.',
            });
        }

        return this.prisma.achievement.update({
            where: { id },
            data: {
                title,
                description,
            },
        });
    }

    async updateAchievementProgress(
        userId: string,
        achievementCode: string,
        increment: number = 1,
    ) {
        const achievement = await this.prisma.achievement.findUnique({
            where: { code: achievementCode },
        });

        if (!achievement) {
            throw new NotFoundException({
                code: 'errors.achievements.notFound',
                message: 'Достижение не найдено',
            });
        }

        const existingProgress =
            await this.prisma.achievementProgress.findUnique({
                where: {
                    userId_achievementId: {
                        userId,
                        achievementId: achievement.id,
                    },
                },
            });

        const nextProgress = Math.min(
            achievement.goal,
            (existingProgress?.progress ?? 0) + increment,
        );

        const updatedProgress = await this.prisma.achievementProgress.upsert({
            where: {
                userId_achievementId: {
                    userId,
                    achievementId: achievement.id,
                },
            },
            update: {
                progress: nextProgress,
            },
            create: {
                userId,
                achievementId: achievement.id,
                progress: nextProgress,
            },
        });

        if (updatedProgress.progress >= achievement.goal) {
            const granted = await this.grantAchievement(userId, achievement.id);

            if (granted) {
                await this.notificationsService.createNotification(userId, {
                    type: 'achievement',
                    message: `Вы получили достижение: ${achievement.title}`,
                    entityId: achievement.id,
                });
            }
        }

        return updatedProgress;
    }

    async deleteAchievement(id: string) {
        return this.prisma.achievement.delete({
            where: { id },
        });
    }

    async grantAchievement(userId: string, achievementId: string) {
        const exists = await this.prisma.userAchievements.findUnique({
            where: {
                userId_achievementId: {
                    userId,
                    achievementId,
                },
            },
        });

        if (exists) return;

        const granted = await this.prisma.userAchievements.create({
            data: { userId, achievementId },
            include: {
                achievements: true,
            },
        });

        this.achievementsGateway.sendAchievement(userId, granted);

        return granted;
    }
}
