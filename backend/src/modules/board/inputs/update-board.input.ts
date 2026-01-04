import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateBoardInput {
    @IsNotEmpty({ message: 'errors.board.update.title.required' })
    @IsString({ message: 'errors.board.update.title.isString' })
    @MinLength(4, {
        message: 'errors.board.update.title.min',
    })
    @MaxLength(32, {
        message: 'errors.board.update.title.max',
    })
    title: string;
}
