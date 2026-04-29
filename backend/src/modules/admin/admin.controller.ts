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
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { SessionAuthGuard } from 'src/shared/guards/session-auth.guard';
import { BanUserInput } from './input/ban-user.input';
import { UserRole } from '@prisma/client';

@UseGuards(SessionAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Authorization()
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @Get('admin-stats')
    async getAdminStats() {
        return this.adminService.getAdminStats();
    }

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

    @Authorization()
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @Post('ban')
    async banUser(@Body() input: BanUserInput) {
        return this.adminService.banUser(input);
    }

    @Authorization()
    @Roles(UserRole.ADMIN, UserRole.CREATOR)
    @Post('unban/:id')
    async unbanUser(@Param('id') id: string) {
        return this.adminService.unbanUser(id);
    }

    @Authorization()
    @Roles(UserRole.CREATOR)
    @Post('role/:id')
    async setUserRole(@Param('id') id: string, @Body('role') role: UserRole) {
        return this.adminService.setUserRole(id, role);
    }
}
