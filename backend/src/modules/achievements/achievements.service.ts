import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { AchievementsGateway } from './achievements.gateway';
import { CreateAchievementInput } from './inputs/create-achievement.input';
import { UpdateAchievementInput } from './inputs/update-achievement.input';

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
                goal: input.goal,
            },
        });
    }

    async findAllAchievements() {
        return this.prisma.achievement.findMany({
            orderBy: { createdAt: 'asc' },
        });
    }

    async updateAchievement(input: UpdateAchievementInput) {
        const { id, title, description, goal } = input;
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
                goal,
            },
        });
    }

    async deleteAchievement(id: string) {
        return this.prisma.achievement.delete({
            where: { id },
        });
    }

    private async grantAchievement(userId: string, achievementId: string) {
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
    }
}
