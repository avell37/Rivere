import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma/prisma.service';
import { AdminAuditQueryInput } from './input/admin-audit-query.input';
import { LogAdminAuditParams } from './types/admin.types';

@Injectable()
export class AdminAuditService {
    constructor(private readonly prisma: PrismaService) {}

    async log(params: LogAdminAuditParams) {
        return this.prisma.adminAuditLog.create({
            data: {
                adminId: params.adminId,
                action: params.action,
                targetType: params.targetType ?? null,
                targetId: params.targetId ?? null,
                metadata: params.metadata ?? undefined,
            },
        });
    }

    async getLogs(query: AdminAuditQueryInput) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;

        const where: Prisma.AdminAuditLogWhereInput = {};

        if (query.action) {
            where.action = query.action;
        }

        const [items, total] = await Promise.all([
            this.prisma.adminAuditLog.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    admin: {
                        select: {
                            id: true,
                            username: true,
                            nickname: true,
                        },
                    },
                },
            }),
            this.prisma.adminAuditLog.count({ where }),
        ]);

        return {
            items,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
}
