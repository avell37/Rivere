import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAchievementInput {
    @IsNotEmpty({ message: 'ID достижения обязателен' })
    @IsString({ message: 'ID достижения должен быть строкой' })
    id: string;

    @IsOptional()
    @IsString({ message: 'Название достижения должно быть строкой' })
    title?: string;

    @IsOptional()
    @IsString({ message: 'Описание достижения должно быть строкой' })
    description?: string;

    @IsOptional()
    @IsNumber()
    goal?: number;
}
