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
import { BanUserInput } from './input/ban-user.input';
import { UserRole } from '@prisma/client';
import { SessionAuthGuard } from '@/shared/guards/session-auth.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { Authorization } from '@/shared/decorators/authorization.decorator';
import { Roles } from '@/shared/decorators/roles.decorator';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(SessionAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

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
    async getAllUsers(
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        return this.adminService.getAllUsers(
            Number(page) || 1,
            Number(limit) || 10,
        );
    }

    @ApiOperation({
        summary: 'Забанить пользователя',
        description:
            'Банит пользователя на определенное время с указанием причины. Доступен только для "ADMIN" или "CREATOR"',
    })
    @Authorization()
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @Post('ban')
    async banUser(@Body() input: BanUserInput) {
        return this.adminService.banUser(input);
    }

    @ApiOperation({
        summary: 'Разбанить пользователя',
        description:
            'Разбан пользователя. Доступен только для "ADMIN" или "CREATOR"',
    })
    @Authorization()
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @Post('unban/:id')
    async unbanUser(@Param('id') id: string) {
        return this.adminService.unbanUser(id);
    }

    @ApiOperation({
        summary: 'Выдача новой роли',
        description:
            'Выдает новую роль из существующих. Доступен только для "CREATOR"',
    })
    @Authorization()
    @Roles(UserRole.CREATOR)
    @Post('role/:id')
    async setUserRole(@Param('id') id: string, @Body('role') role: UserRole) {
        return this.adminService.setUserRole(id, role);
    }
}
