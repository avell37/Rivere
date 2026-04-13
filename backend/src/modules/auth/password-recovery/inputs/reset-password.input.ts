import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordInput {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
