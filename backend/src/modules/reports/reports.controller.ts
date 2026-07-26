import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ReportsService } from './reports.service';
import { CreateReportInput } from './input/create-report.input';
import { SessionAuthGuard } from '@/shared/guards/session-auth.guard';
import { Authorization } from '@/shared/decorators/authorization.decorator';
import { SessionUser } from '@/shared/decorators/session-user.decorator';

@UseGuards(SessionAuthGuard)
@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @ApiOperation({ summary: 'Отправить жалобу' })
    @Authorization()
    @Throttle({
        default: {
            ttl: 1000 * 60 * 15,
            limit: 5,
        },
    })
    @Post()
    async createReport(
        @SessionUser('id') userId: string,
        @Body() input: CreateReportInput,
    ) {
        return this.reportsService.createReport(userId, input);
    }
}
