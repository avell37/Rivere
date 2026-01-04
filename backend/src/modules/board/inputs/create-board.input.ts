import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateBoardBackground {
    @IsOptional()
    @IsString({ message: 'errors.board.background.url.isString' })
    url?: string | null;

    @IsOptional()
    @IsString({ message: 'errors.board.background.color.isString' })
    color?: string | null;
}

export class CreateBoardInput {
    @IsNotEmpty({ message: 'errors.board.create.title.required' })
    @IsString({ message: 'errors.board.create.title.isString' })
    @MinLength(4, { message: 'errors.board.create.title.min' })
    @MaxLength(64, { message: 'errors.board.create.title.max' })
    title: string;

    @IsOptional()
    background: CreateBoardBackground;
}
