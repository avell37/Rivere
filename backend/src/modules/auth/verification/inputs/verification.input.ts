import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class VerificationInput {
    @IsNotEmpty({ message: 'Токен обязателен' })
    @IsString({ message: 'Токен должен быть строкой' })
    @MinLength(6)
    public token!: string;
}
