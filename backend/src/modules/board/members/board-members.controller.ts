import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
} from '@nestjs/common';
import { BoardMembersService } from './board-members.service';
import { ApiOperation } from '@nestjs/swagger';
import { RemoveMemberDto } from './dto/remove-member.dto';
import { Authorization } from '@/shared/decorators/authorization.decorator';
import { SessionUser } from '@/shared/decorators/session-user.decorator';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto';

@Controller('members')
export class BoardMembersController {
    constructor(private readonly boardMembersService: BoardMembersService) {}

    @ApiOperation({
        summary: 'Повысить/понизить участника',
        description:
            'При вызове метода участник повышается или понижаеться в роли.',
    })
    @Authorization()
    @Get(':boardId')
    async getAllMembers(@Param('boardId') boardId: string) {
        return this.boardMembersService.getAllMembers(boardId);
    }

    @ApiOperation({
        summary: 'Повысить/понизить участника',
        description:
            'При вызове метода участник повышается или понижаеться в роли.',
    })
    @Authorization()
    @HttpCode(200)
    @Patch(':boardId/:targetUserId/role')
    async updatedMemberRole(
        @SessionUser('id') currentUserId: string,
        @Param('boardId') boardId: string,
        @Param('targetUserId') targetUserId: string,
        @Body() dto: UpdateMemberRoleDto,
    ) {
        return this.boardMembersService.updateMemberRole(
            currentUserId,
            boardId,
            targetUserId,
            dto.role,
        );
    }

    @ApiOperation({
        summary: 'Принять инвайт',
        description: 'При вызове метода принимается приглашение в доску.',
    })
    @HttpCode(200)
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
