import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ReorderCardInput {
    @IsNotEmpty({ message: 'ID колонки обязателен' })
    @IsString({ message: 'ID колонки должен быть строкой' })
    columnId: string;

    @IsArray({ message: 'Карточки должны быть массивом' })
    @IsString({ each: true, message: 'Карточки должны быть строками' })
    cards: string[];
}
