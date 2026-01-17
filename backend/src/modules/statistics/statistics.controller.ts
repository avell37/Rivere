import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { ApiOperation } from '@nestjs/swagger';

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
