import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyTokenInput {
    @IsNotEmpty({ message: 'Токен обязателен' })
    @IsString({ message: 'Токен должен быть строкой' })
    token!: string;
}
