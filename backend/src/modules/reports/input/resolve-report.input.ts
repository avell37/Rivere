import { Type } from 'class-transformer';
import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    Min,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { ReportResolutionAction, ReportStatus } from '@prisma/client';
import { BanDurationUnit } from '@/modules/admin/input/ban-user.input';

export class ResolveReportBanInput {
    @IsNotEmpty({ message: 'Причина бана обязательна' })
    @IsString({ message: 'Причина бана должна быть строкой' })
    reason!: string;

    @IsInt({ message: 'Срок блокировки должен быть числом' })
    @Min(1)
    duration!: number;

    @IsEnum(BanDurationUnit)
    unit!: BanDurationUnit;
}

export class ResolveReportInput {
    @IsEnum(ReportStatus)
    status: ReportStatus;

    @IsOptional()
    @IsEnum(ReportResolutionAction)
    action?: ReportResolutionAction;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    resolutionNote?: string;

    @ValidateIf(
        (input: ResolveReportInput) =>
            input.action === ReportResolutionAction.BAN_USER,
    )
    @ValidateNested()
    @Type(() => ResolveReportBanInput)
    ban?: ResolveReportBanInput;
}
