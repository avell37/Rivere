import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class BoardBackground {
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
    @MinLength(1, { message: 'Минимальная длина названия доски 1 символ' })
    @MaxLength(64, { message: 'Максимальная длина названия доски 64 символа' })
    title!: string;

    @IsOptional()
    background!: BoardBackground;
}
