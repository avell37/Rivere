import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { CreateAchievementInput } from './inputs/create-achievement.input';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { UpdateAchievementInput } from './inputs/update-achievement.input';

@Controller('achievements')
@Authorization()
export class AchievementsController {
    constructor(private readonly achievementsService: AchievementsService) {}

    @Post('create')
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @UseGuards(RolesGuard)
    async createAchievement(@Body() input: CreateAchievementInput) {
        return this.achievementsService.createAchievement(input);
    }

    @Authorization()
    @Get()
    async findAllAchievements() {
        return this.achievementsService.findAllAchievements();
    }

    @Patch('update')
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @UseGuards(RolesGuard)
    async updateAchievement(@Body() input: UpdateAchievementInput) {
        return this.achievementsService.updateAchievement(input);
    }
}
