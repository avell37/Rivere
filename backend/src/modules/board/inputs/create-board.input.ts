import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateBoardBackground {
    @IsOptional()
    @IsString({ message: 'Изображение доски должно быть строкой' })
    url?: string | null;

    @IsOptional()
    @IsString({ message: 'Цвет доски должен быть строкой' })
    color?: string | null;
}

export class CreateBoardInput {
    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Название доски должно быть строкой' })
    @MinLength(4, {
        message: 'Минимальная длина названия доски - 4 символа',
    })
    @MaxLength(32, {
        message: 'Максимальная длина названия доски - 32 символа',
    })
    title: string;

    @IsOptional()
    background: CreateBoardBackground;
}
