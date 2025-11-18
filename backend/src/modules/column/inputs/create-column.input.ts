import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateColumnInput {
    @IsString({ message: 'ID доски должно быть строкой' })
    boardId: string;

    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Название колонки должно быть строкой' })
    @MinLength(4, {
        message: 'Минимальная длина названия колонки - 4 символа',
    })
    @MaxLength(32, {
        message: 'Максимальная длина названия колонки - 32 символа',
    })
    title: string;
}
