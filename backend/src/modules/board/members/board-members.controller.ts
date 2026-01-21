import { Controller, Delete, Param } from '@nestjs/common';
import { BoardMembersService } from './board-members.service';
import { ApiOperation } from '@nestjs/swagger';
import { Authorization } from 'src/shared/decorators/authorization.decorator';
import { SessionUser } from 'src/shared/decorators/session-user.decorator';
import { RemoveMemberDto } from './dto/remove-member.dto';

@Controller('members')
export class BoardMembersController {
    constructor(private readonly boardMembersService: BoardMembersService) {}

    @ApiOperation({
        summary: 'Принять инвайт',
        description: 'При вызове метода принимается приглашение в доску.',
    })
    @Authorization()
    @Delete(':boardId/:userId')
    async deleteMember(
        @SessionUser('id') currentUserId: string,
        @Param() params: RemoveMemberDto,
    ) {
        return this.boardMembersService.deleteMember(
            currentUserId,
            params.boardId,
            params.userId,
        );
    }
}
