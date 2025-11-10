import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChangeEmailInput {
    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Почта должна быть строкой' })
    @IsEmail()
    email: string;
}
