import type { Priority } from '@prisma/client';
import {
    IsBoolean,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class UpdateCardInput {
    @IsOptional()
    @IsString({ message: 'Название карточки должно быть строкой' })
    @MinLength(1, {
        message: 'Название карточки должно быть не менее 1 символа',
    })
    @MaxLength(32, {
        message: 'Название карточки должно быть не более 32 символов',
    })
    title?: string;

    @IsOptional()
    @IsString({ message: 'Описание должно быть строкой' })
    @MaxLength(256, { message: 'Описание должно быть не более 256 символов' })
    description?: string;

    @IsOptional()
    @IsString({ message: 'Приоритет должен быть строкой' })
    priority?: Priority;

    @IsOptional()
    @IsString({ message: 'Дедлайн должен быть строкой' })
    deadline?: string;

    @IsOptional()
    @IsBoolean()
    done?: boolean;
}
