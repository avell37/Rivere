import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}

    @Authorization()
    @Get()
    async get(@SessionUser('id') userId: string) {
        return this.statisticsService.getOrCreate(userId);
    }
}
