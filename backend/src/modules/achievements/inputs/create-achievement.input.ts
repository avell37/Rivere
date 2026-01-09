import { IsInt, IsString, Min } from 'class-validator';

export class CreateAchievementInput {
    @IsString({ message: 'Код должен быть строкой' })
    code: string;

    @IsString({ message: 'Название достижения должно быть строкой' })
    title: string;

    @IsString({ message: 'Описание достижения должно быть строкой' })
    description: string;

    @IsInt()
    @Min(1)
    goal: number;
}
