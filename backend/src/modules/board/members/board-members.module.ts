import { Module } from '@nestjs/common';
import { BoardMembersController } from './board-members.controller';
import { BoardMembersService } from './board-members.service';
import { BoardGateway } from '../board.gateway';
import { ActivityLogModule } from '../../activity-log/activity-log.module';

@Module({
    imports: [ActivityLogModule],
    controllers: [BoardMembersController],
    providers: [BoardMembersService, BoardGateway],
})
export class BoardMembersModule {}
