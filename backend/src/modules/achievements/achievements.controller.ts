import {
    Body,
    Controller,
    Get,
    HttpCode,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { CreateAchievementInput } from './inputs/create-achievement.input';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { UpdateAchievementInput } from './inputs/update-achievement.input';
import { ApiOperation } from '@nestjs/swagger';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('achievements')
@Authorization()
export class AchievementsController {
    constructor(private readonly achievementsService: AchievementsService) {}

    @ApiOperation({
        summary: 'Создание достижения',
        description: 'Создает достижение. Доступен для "ADMIN" и "CREATOR".',
    })
    @HttpCode(200)
    @Post('create')
    @Roles(UserRole.CREATOR)
    @UseGuards(RolesGuard)
    async createAchievement(@Body() input: CreateAchievementInput) {
        return this.achievementsService.createAchievement(input);
    }

    @ApiOperation({
        summary: 'Получение всех достижений',
        description: 'Отдает все достижения',
    })
    @Authorization()
    @Get()
    async findAllAchievements(@SessionUser('id') userId: string) {
        return this.achievementsService.findAllAchievements(userId);
    }

    @ApiOperation({
        summary: 'Обновление достижения',
        description: 'Обновляет достижение. Доступен для "ADMIN" и "CREATOR".',
    })
    @HttpCode(200)
    @Patch('update')
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @UseGuards(RolesGuard)
    async updateAchievement(@Body() input: UpdateAchievementInput) {
        return this.achievementsService.updateAchievement(input);
    }
}
