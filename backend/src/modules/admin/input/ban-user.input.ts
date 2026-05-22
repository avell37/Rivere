import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export enum BanDurationUnit {
    SECONDS = 'seconds',
    MINUTES = 'minutes',
    HOURS = 'hours',
    DAYS = 'days',
}

export class BanUserInput {
    @IsNotEmpty({ message: 'User ID обязателен' })
    @IsString({ message: 'User ID должен быть строкой' })
    userId!: string;

    @IsNotEmpty({ message: 'Причина бана обязательна' })
    @IsString({ message: 'Причина бана должна быть строкой' })
    reason!: string;

    @IsInt({ message: 'Срок блокировки должен быть числом' })
    @Min(1)
    duration!: number;

    @IsEnum(BanDurationUnit)
    unit!: BanDurationUnit;
}
