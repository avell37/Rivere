import { ReportStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class AdminReportsQueryInput {
    @IsOptional()
    @Transform(({ value }: { value: unknown }) => Number(value) || 1)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Transform(({ value }: { value: unknown }) => Number(value) || 10)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @IsOptional()
    @IsEnum(ReportStatus)
    status?: ReportStatus;
}
