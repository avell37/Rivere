import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserInput {
    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Имя пользователя должно быть строкой' })
    @MinLength(4, {
        message: 'Минимальная длина имени пользователя - 4 символа',
    })
    @MaxLength(32, {
        message: 'Максимальная длина имени пользователя - 32 символа',
    })
    username: string;

    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Почта должна быть строкой' })
    email: string;

    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Пароль должен быть строкой' })
    @MinLength(6, { message: 'Минимальная длина пароля - 6 символов' })
    @MaxLength(64, { message: 'Максимальная длина пароля - 64 символа' })
    password: string;
}
