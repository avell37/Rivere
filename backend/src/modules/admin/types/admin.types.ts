import { AdminAuditAction, Prisma } from '@prisma/client';

export interface LogAdminAuditParams {
    adminId: string;
    action: AdminAuditAction;
    targetType?: string;
    targetId?: string;
    metadata?: Prisma.InputJsonValue;
}
