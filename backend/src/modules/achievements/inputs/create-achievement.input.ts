import { IsInt, IsString, Min } from 'class-validator';

export class CreateAchievementInput {
    @IsString()
    code: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    icon: string;

    @IsInt()
    @Min(1)
    goal: number;
}
