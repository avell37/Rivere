import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { ColumnGateway } from './column.gateway';

@Module({
    controllers: [ColumnController],
    providers: [ColumnService, ColumnGateway],
})
export class ColumnModule {}
