import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateColumnInput {
    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Название колонки должно быть строкой' })
    @MinLength(1, {
        message: 'Название колонки должно быть не менее 1 символа',
    })
    @MaxLength(32, {
        message: 'Название колонки должно быть не более 32 символов',
    })
    title!: string;
}
