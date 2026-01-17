import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { BoardBackground } from './create-board.input';

export class UpdateBoardInput {
    @IsOptional()
    @IsString({ message: 'Название доски должно быть строкой' })
    @MinLength(4, { message: 'Минимальная длина названия доски 4 символа' })
    @MaxLength(32, { message: 'Максимальная длина названия доски 32 символа' })
    title: string;

    @IsOptional()
    background: BoardBackground;
}
