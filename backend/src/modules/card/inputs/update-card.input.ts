import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Priority } from 'generated/prisma/enums';

export class UpdateCardInput {
    @IsOptional()
    @IsString({ message: 'Название карточки должно быть строкой' })
    @MinLength(4, {
        message: 'Минимальная длина названия карточки - 4 символа',
    })
    @MaxLength(32, {
        message: 'Максимальная длина названия карточки - 32 символа',
    })
    title?: string;

    @IsOptional()
    @IsString({ message: 'Описание карточки должно быть строкой' })
    @MaxLength(100, {
        message: 'Максимальная длина описания карточки - 100 символа',
    })
    description?: string;

    @IsOptional()
    @IsString()
    priority?: Priority;

    @IsOptional()
    deadline?: string;
}
