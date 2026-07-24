import { IsString, MinLength } from 'class-validator';

export class InviteUserInput {
    @IsString()
    userId!: string;
}

export class SearchInviteUsersQuery {
    @IsString()
    @MinLength(2)
    q!: string;
}
