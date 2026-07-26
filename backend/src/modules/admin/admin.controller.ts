import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminAuditService } from './admin-audit.service';
import { AdminUsersQueryInput } from './input/admin-users-query.input';
import { AdminAuditQueryInput } from './input/admin-audit-query.input';
import { BanUserInput } from './input/ban-user.input';
import { UserRole } from '@prisma/client';
import { SessionAuthGuard } from '@/shared/guards/session-auth.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { Authorization } from '@/shared/decorators/authorization.decorator';
import { Roles } from '@/shared/decorators/roles.decorator';
import { SessionUser } from '@/shared/decorators/session-user.decorator';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(SessionAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        private readonly adminAuditService: AdminAuditService,
    ) {}

    @ApiOperation({
        summary: 'Статистика для администратора',
        description:
            'Отдает статистику для панели администратора. Доступен только для "ADMIN" или "CREATOR"',
    })
    @Authorization()
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @Get('admin-stats')
    async getAdminStats() {
        return this.adminService.getAdminStats();
    }

    @ApiOperation({
        summary: 'Все пользователи для администратора',
        description:
            'Отдает всех пользователей, которые зарегистрированны на сайте для панели администратора. Доступен только для "ADMIN" или "CREATOR"',
    })
    @Authorization()
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @Get('admin-users')
    async getAllUsers(@Query() query: AdminUsersQueryInput) {
        return this.adminService.getAllUsers(query);
    }

    @ApiOperation({
        summary: 'Забанить пользователя',
        description:
            'Банит пользователя на определенное время с указанием причины. Доступен только для "ADMIN" или "CREATOR"',
    })
    @Authorization()
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @Post('ban')
    async banUser(
        @SessionUser('id') adminId: string,
        @Body() input: BanUserInput,
    ) {
        return this.adminService.banUser(adminId, input);
    }

    @ApiOperation({
        summary: 'Разбанить пользователя',
        description:
            'Разбан пользователя. Доступен только для "ADMIN" или "CREATOR"',
    })
    @Authorization()
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @Post('unban/:id')
    async unbanUser(
        @SessionUser('id') adminId: string,
        @Param('id') id: string,
    ) {
        return this.adminService.unbanUser(adminId, id);
    }

    @ApiOperation({
        summary: 'Выдача новой роли',
        description:
            'Выдает новую роль из существующих. Доступен только для "CREATOR"',
    })
    @Authorization()
    @Roles(UserRole.CREATOR)
    @Post('role/:id')
    async setUserRole(
        @SessionUser('id') adminId: string,
        @Param('id') id: string,
        @Body('role') role: UserRole,
    ) {
        return this.adminService.setUserRole(adminId, id, role);
    }

    @ApiOperation({
        summary: 'Журнал действий администраторов',
        description:
            'Возвращает audit log действий модерации. Доступен только для CREATOR',
    })
    @Authorization()
    @Roles(UserRole.CREATOR)
    @Get('audit-logs')
    async getAuditLogs(@Query() query: AdminAuditQueryInput) {
        return this.adminAuditService.getLogs(query);
    }
}
