import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { ReportsService } from './reports.service';
import { AdminReportsQueryInput } from './input/admin-reports-query.input';
import { ResolveReportInput } from './input/resolve-report.input';
import { SessionAuthGuard } from '@/shared/guards/session-auth.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { Authorization } from '@/shared/decorators/authorization.decorator';
import { Roles } from '@/shared/decorators/roles.decorator';
import { SessionUser } from '@/shared/decorators/session-user.decorator';

@UseGuards(SessionAuthGuard, RolesGuard)
@Controller('admin/reports')
export class AdminReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @ApiOperation({ summary: 'Список жалоб для администратора' })
    @Authorization()
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @Get()
    async getReports(@Query() query: AdminReportsQueryInput) {
        return this.reportsService.getReports(query);
    }

    @ApiOperation({ summary: 'Обработать жалобу' })
    @Authorization()
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @Patch(':id')
    async resolveReport(
        @SessionUser('id') adminId: string,
        @Param('id') reportId: string,
        @Body() input: ResolveReportInput,
    ) {
        return this.reportsService.resolveReport(adminId, reportId, input);
    }
}
