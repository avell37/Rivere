import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminAuditService } from './admin-audit.service';
import { CoreModule } from '@/core/core.module';

@Module({
    imports: [CoreModule],
    controllers: [AdminController],
    providers: [AdminService, AdminAuditService],
    exports: [AdminAuditService, AdminService],
})
export class AdminModule {}
