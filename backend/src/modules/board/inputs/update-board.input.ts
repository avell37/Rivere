import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateBoardInput {
    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Название доски должно быть строкой' })
    @MinLength(4, { message: 'Минимальная длина названия доски 4 символа' })
    @MaxLength(64, { message: 'Максимальная длина названия доски 64 символа' })
    title: string;
}
