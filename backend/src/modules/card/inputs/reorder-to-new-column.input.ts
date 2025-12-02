import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReorderToNewColumn {
    @IsString()
    @IsNotEmpty()
    cardId: string;

    @IsString()
    @IsNotEmpty()
    newColumnId: string;

    @IsNumber()
    position: number;
}
