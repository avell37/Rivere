import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ReorderColumnInput {
    @IsNotEmpty({ message: 'ID доски обязателен' })
    @IsString({ message: 'ID доски должен быть строкой' })
    boardId: string;

    @IsArray({ message: 'Список колонок должен быть массивом' })
    @IsString({ each: true, message: 'Каждый ID колонки должен быть строкой' })
    columns: string[];
}
