import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangeNicknameInput {
    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Никнейм должно быть строкой' })
    @MinLength(4, {
        message: 'Минимальная длина никнейма - 4 символа',
    })
    @MaxLength(32, {
        message: 'Максимальная длина никнейма - 32 символа',
    })
    nickname: string;
}
