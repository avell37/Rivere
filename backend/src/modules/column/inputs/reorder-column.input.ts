import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ReorderColumnInput {
    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'ID доски должно быть строкой' })
    boardId: string;

    @IsArray()
    @IsString({ each: true })
    columns: string[];
}
