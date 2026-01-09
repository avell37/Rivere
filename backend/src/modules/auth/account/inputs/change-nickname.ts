import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangeNicknameInput {
    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Имя пользователя должно быть строкой' })
    @MinLength(4, {
        message: 'Минимальная длина имени пользователя 4 символа',
    })
    @MaxLength(32, {
        message: 'Максимальная длина имени пользователя 32 символа',
    })
    nickname: string;
}
