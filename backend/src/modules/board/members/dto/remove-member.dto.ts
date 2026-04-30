import { IsUUID } from 'class-validator';

export class RemoveMemberDto {
    @IsUUID()
    boardId!: string;

    @IsUUID()
    userId!: string;
}
