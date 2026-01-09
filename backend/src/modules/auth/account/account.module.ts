import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { FilesModule } from 'src/modules/files/files.module';
import { StatisticsModule } from 'src/modules/statistics/statistics.module';

@Module({
    imports: [FilesModule, StatisticsModule],
    controllers: [AccountController],
    providers: [AccountService],
})
export class AccountModule {}
