import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ReorderCardInput {
    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'ID колонки должно быть строкой' })
    columnId: string;

    @IsArray()
    @IsString({ each: true })
    cards: string[];
}
