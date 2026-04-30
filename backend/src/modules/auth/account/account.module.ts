import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { VerificationModule } from '../verification/verification.module';
import { StatisticsModule } from '@/modules/statistics/statistics.module';
import { FilesModule } from '@/modules/files/files.module';

@Module({
    imports: [FilesModule, StatisticsModule, VerificationModule],
    controllers: [AccountController],
    providers: [AccountService],
})
export class AccountModule {}
