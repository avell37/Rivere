import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { AchievementsGateway } from './achievements.gateway';
import { CreateAchievementInput } from './inputs/create-achievement.input';

@Injectable()
export class AchievementsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly achievementsGateway: AchievementsGateway,
    ) {}

    async createAchievement(input: CreateAchievementInput) {
        const exists = await this.prisma.achievement.findUnique({
            where: {
                code: input.code,
            },
        });

        if (exists) {
            throw new BadRequestException(
                'Достижение с таким кодом уже существует.',
            );
        }

        return this.prisma.achievement.create({
            data: {
                code: input.code,
                title: input.title,
                description: input.description,
                icon: input.icon,
                goal: input.goal,
            },
        });
    }

    async findAllAchievements() {
        return this.prisma.achievement.findMany({
            orderBy: { createdAt: 'asc' },
        });
    }

    async deleteAchievement(id: string) {
        return this.prisma.achievement.delete({
            where: { id },
        });
    }

    private async grantAchievement(userId: string, achievementId: string) {
        const exists = await this.prisma.userAchievement.findUnique({
            where: {
                userId_achievementId: {
                    userId,
                    achievementId,
                },
            },
        });
        6;
        if (exists) return;

        const granted = await this.prisma.userAchievement.create({
            data: { userId, achievementId },
            include: {
                achievement: true,
            },
        });

        this.achievementsGateway.sendAchievement(userId, granted);
    }
}
