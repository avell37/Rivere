import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Priority } from 'generated/prisma/enums';

export class CreateCardInput {
    @IsNotEmpty({ message: 'ID колонки обязателен' })
    @IsString({ message: 'ID колонки должен быть строкой' })
    columnId: string;

    @IsNotEmpty({ message: 'Название карточки обязательно' })
    @IsString({ message: 'Название карточки должно быть строкой' })
    @MinLength(4, {
        message: 'Название карточки должно быть не менее 4 символов',
    })
    @MaxLength(32, {
        message: 'Название карточки должно быть не более 32 символов',
    })
    title: string;

    description?: string;

    @IsNotEmpty({ message: 'Приоритет обязателен' })
    @IsString({ message: 'Приоритет должен быть строкой' })
    priority: Priority;

    @IsNotEmpty({ message: 'Дедлайн обязателен' })
    @IsString({ message: 'Дедлайн должен быть строкой' })
    deadline: string;
}
