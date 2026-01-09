import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
    @IsNotEmpty({ message: 'ID карточки обязателен' })
    @IsString({ message: 'ID карточки должен быть строкой' })
    cardId: string;
}
