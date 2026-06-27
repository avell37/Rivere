import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { BoardModule } from '../board/board.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';

@Module({
    imports: [BoardModule, ActivityLogModule],
    controllers: [ColumnController],
    providers: [ColumnService],
})
export class ColumnModule {}
