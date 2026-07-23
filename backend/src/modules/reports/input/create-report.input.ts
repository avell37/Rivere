import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ReportTargetType } from '@prisma/client';

export class CreateReportInput {
    @IsEnum(ReportTargetType)
    targetType: ReportTargetType;

    @IsUUID()
    targetId: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(500)
    reason: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    details?: string;
}
