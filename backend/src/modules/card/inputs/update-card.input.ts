import {
    IsBoolean,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Priority } from 'generated/prisma/enums';

export class UpdateCardInput {
    @IsOptional()
    @IsString({ message: 'Название карточки должно быть строкой' })
    @MinLength(4, {
        message: 'Название карточки должно быть не менее 4 символов',
    })
    @MaxLength(32, {
        message: 'Название карточки должно быть не более 32 символов',
    })
    title?: string;

    @IsOptional()
    @IsString({ message: 'Описание должно быть строкой' })
    @MaxLength(100, { message: 'Описание должно быть не более 100 символов' })
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
