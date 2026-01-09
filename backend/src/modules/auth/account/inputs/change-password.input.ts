import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordInput {
    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Пароль должен быть строкой' })
    @MinLength(6, { message: 'Минимальная длина пароля 6 символов' })
    @MaxLength(64, { message: 'Максимальная длина пароля 64 символа' })
    currentPassword: string;

    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Пароль должен быть строкой' })
    @MinLength(6, { message: 'Минимальная длина пароля 6 символов' })
    @MaxLength(64, { message: 'Максимальная длина пароля 64 символа' })
    newPassword: string;
}
