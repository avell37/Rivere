import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewPasswordInput {
    @IsNotEmpty()
    @IsString()
    token!: string;

    @IsNotEmpty()
    @IsString()
    newPassword!: string;
}
