import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { AdminReportsController } from './admin-reports.controller';
import { CoreModule } from '@/core/core.module';
import { ChatModule } from '@/modules/chat/chat.module';

@Module({
    imports: [CoreModule, ChatModule],
    controllers: [ReportsController, AdminReportsController],
    providers: [ReportsService],
})
export class ReportsModule {}
