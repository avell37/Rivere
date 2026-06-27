import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ActivityLogService } from './activity-log.service';
import { Authorization } from '@/shared/decorators/authorization.decorator';
import { SessionUser } from '@/shared/decorators/session-user.decorator';
import { checkBoardAccess } from '@/shared/utils/check-board-access.util';
import { PrismaService } from '@/core/prisma/prisma.service';

@Controller('activity-log')
export class ActivityLogController {
    constructor(
        private readonly activityLogService: ActivityLogService,
        private readonly prisma: PrismaService,
    ) {}

    @ApiOperation({
        summary: 'Получение лога активности доски',
        description: 'Возвращает список событий активности на доске.',
    })
    @Authorization()
    @Get(':boardId')
    async getBoardActivityLog(
        @SessionUser('id') userId: string,
        @Param('boardId') boardId: string,
        @Query('limit') limit?: string,
        @Query('offset') offset?: string,
    ) {
        await checkBoardAccess({ prisma: this.prisma, userId, boardId });

        return this.activityLogService.getBoardActivityLog(
            boardId,
            limit ? parseInt(limit, 10) : 50,
            offset ? parseInt(offset, 10) : 0,
        );
    }
}
