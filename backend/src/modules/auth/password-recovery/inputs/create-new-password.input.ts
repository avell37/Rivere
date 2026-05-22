import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewPasswordInput {
    @IsNotEmpty({ message: 'Токен обязателен' })
    @IsString({ message: 'Токен должен быть строкой' })
    token!: string;

    @IsNotEmpty({ message: 'Новый пароль обязателен' })
    @IsString({ message: 'Новый пароль должен быть строкой' })
    newPassword!: string;
}
