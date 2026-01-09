import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReorderToNewColumn {
    @IsNotEmpty({ message: 'ID карточки обязателен' })
    @IsString({ message: 'ID карточки должен быть строкой' })
    cardId: string;

    @IsNotEmpty({ message: 'ID новой колонки обязателен' })
    @IsString({ message: 'ID новой колонки должен быть строкой' })
    newColumnId: string;

    @IsNumber({}, { message: 'Позиция должна быть числом' })
    position: number;
}
