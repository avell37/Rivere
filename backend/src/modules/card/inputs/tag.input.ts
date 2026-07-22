import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class TagInput {
    @IsString({ message: 'Название тега должно быть строкой' })
    @MinLength(1, { message: 'Название тега обязательно' })
    @MaxLength(24, { message: 'Название тега не более 24 символов' })
    title!: string;

    @IsString({ message: 'Цвет тега должен быть строкой' })
    @Matches(/^#[0-9a-fA-F]{6}$/, {
        message: 'Цвет тега должен быть в формате #RRGGBB',
    })
    background!: string;
}
