import { AdminAuditAction } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export class AdminAuditQueryInput {
    @IsOptional()
    @Transform(({ value }) => Number(value) || 1)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Transform(({ value }) => Number(value) || 20)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 20;

    @IsOptional()
    @IsEnum(AdminAuditAction)
    action?: AdminAuditAction;
}
