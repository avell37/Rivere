import { IsString, MinLength } from 'class-validator';

export class DeleteAccountInput {
    @IsString()
    @MinLength(6)
    currentPassword!: string;
}
