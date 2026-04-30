import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiOperation } from '@nestjs/swagger';
import { Authorization } from '@/shared/decorators/authorization.decorator';
import { SessionUser } from '@/shared/decorators/session-user.decorator';

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}

    @ApiOperation({
        summary: 'Получение статистики пользователя',
        description:
            'Отдает подробную статистику пользователя, используя его ID',
    })
    @Authorization()
    @Get()
    async get(@SessionUser('id') userId: string) {
        return this.statisticsService.getOrCreate(userId);
    }
}
