import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty({ message: 'ID чата обязателен' })
    @IsString({ message: 'ID чата должен быть строкой' })
    chatId: string;

    @IsNotEmpty({ message: 'ID пользователя обязателен' })
    @IsString({ message: 'ID пользователя должен быть строкой' })
    userId: string;

    @IsNotEmpty({ message: 'Текст сообщения обязателен' })
    @IsString({ message: 'Текст сообщения должен быть строкой' })
    text: string;
}
