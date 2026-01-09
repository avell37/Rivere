import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateColumnInput {
    @IsNotEmpty({ message: 'ID доски обязателен' })
    @IsString({ message: 'ID доски должен быть строкой' })
    boardId: string;

    @IsNotEmpty({ message: 'Поле обязательно к заполнению' })
    @IsString({ message: 'Название колонки должно быть строкой' })
    @MinLength(4, {
        message: 'Название колонки должно быть не менее 4 символов',
    })
    @MaxLength(32, {
        message: 'Название колонки должно быть не более 32 символов',
    })
    title: string;
}
