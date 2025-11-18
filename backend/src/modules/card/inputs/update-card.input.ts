import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCardInput {
    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Название колонки должно быть строкой' })
    @MinLength(4, {
        message: 'Минимальная длина названия карточки - 4 символа',
    })
    @MaxLength(32, {
        message: 'Максимальная длина названия карточки - 32 символа',
    })
    title: string;

    @IsString({ message: 'Название колонки должно быть строкой' })
    @MaxLength(100, {
        message: 'Максимальная длина описания карточки - 100 символа',
    })
    description: string;
}
