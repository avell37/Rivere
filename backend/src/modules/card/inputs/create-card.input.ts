import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export class CreateCardInput {
    @IsString({ message: 'ID колонки должно быть строкой' })
    columnId: string;

    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Название карточки должно быть строкой' })
    @MinLength(4, {
        message: 'Минимальная длина названия карточки - 4 символа',
    })
    @MaxLength(32, {
        message: 'Максимальная длина названия карточки - 32 символа',
    })
    title: string;

    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Название карточки должно быть строкой' })
    @MinLength(6, {
        message: 'Минимальная длина описания карточки - 6 символов',
    })
    @MaxLength(128, {
        message: 'Максимальная длина описания карточки - 128 символов',
    })
    description?: string;

    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Название карточки должно быть строкой' })
    @MinLength(6, {
        message: 'Минимальная длина описания карточки - 6 символов',
    })
    @MaxLength(128, {
        message: 'Максимальная длина описания карточки - 128 символов',
    })
    priority: Priority;

    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Название карточки должно быть строкой' })
    @MinLength(6, {
        message: 'Минимальная длина описания карточки - 6 символов',
    })
    @MaxLength(128, {
        message: 'Максимальная длина описания карточки - 128 символов',
    })
    deadline: Date;
}
