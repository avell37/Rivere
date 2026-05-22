import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordInput {
    @IsNotEmpty({ message: 'Почта обязательна' })
    @IsString({ message: 'Почта должна быть строкой' })
    @IsEmail()
    email!: string;
}
