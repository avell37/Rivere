import type { Priority } from '@prisma/client';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateCardInput {
    @IsNotEmpty({ message: 'ID колонки обязателен' })
    @IsString({ message: 'ID колонки должен быть строкой' })
    columnId!: string;

    @IsNotEmpty({ message: 'Название карточки обязательно' })
    @IsString({ message: 'Название карточки должно быть строкой' })
    @MinLength(1, {
        message: 'Название карточки должно быть не менее 1 символа',
    })
    @MaxLength(32, {
        message: 'Название карточки должно быть не более 32 символов',
    })
    title!: string;

    @IsOptional()
    description?: string;

    @IsNotEmpty({ message: 'Приоритет обязателен' })
    @IsString({ message: 'Приоритет должен быть строкой' })
    priority!: Priority;

    @IsNotEmpty({ message: 'Дедлайн обязателен' })
    @IsString({ message: 'Дедлайн должен быть строкой' })
    @IsOptional()
    deadline?: string;
}
