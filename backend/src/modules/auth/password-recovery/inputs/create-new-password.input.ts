import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateNewPasswordInput {
    @IsNotEmpty({ message: 'Токен обязателен' })
    @IsString({ message: 'Токен должен быть строкой' })
    token!: string;

    @IsNotEmpty({ message: 'Новый пароль обязателен' })
    @IsString({ message: 'Новый пароль должен быть строкой' })
    @MinLength(6, { message: 'Минимальная длина пароля 6 символов' })
    @MaxLength(64, { message: 'Максимальная длина пароля 64 символа' })
    newPassword!: string;
}
