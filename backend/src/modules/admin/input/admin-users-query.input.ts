import { UserRole } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export enum AdminUsersStatusFilter {
    ALL = 'all',
    BANNED = 'banned',
}

export class AdminUsersQueryInput {
    @IsOptional()
    @Transform(({ value }) => Number(value) || 1)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Transform(({ value }) => Number(value) || 10)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @Transform(({ value }: { value: unknown }) => {
        if (typeof value !== 'string') return undefined;

        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : undefined;
    })
    search?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @IsOptional()
    @IsEnum(AdminUsersStatusFilter)
    status?: AdminUsersStatusFilter;
}
