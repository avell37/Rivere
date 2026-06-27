import { Injectable } from '@nestjs/common';
import { ActivityAction, ActivityEntity, Prisma } from '@prisma/client';
import { PrismaService } from '@/core/prisma/prisma.service';

export interface LogActivityParams {
    boardId: string;
    userId: string;
    action: ActivityAction;
    entityType: ActivityEntity;
    entityId?: string;
    entityTitle?: string;
    meta?: Prisma.InputJsonValue;
}

@Injectable()
export class ActivityLogService {
    constructor(private readonly prisma: PrismaService) {}

    async log(params: LogActivityParams) {
        const {
            boardId,
            userId,
            action,
            entityType,
            entityId,
            entityTitle,
            meta,
        } = params;

        return this.prisma.activityLog.create({
            data: {
                boardId,
                userId,
                action,
                entityType,
                entityId,
                entityTitle,
                meta: meta ?? undefined,
            },
        });
    }

    async getBoardActivityLog(boardId: string, limit = 50, offset = 0) {
        const [items, total] = await Promise.all([
            this.prisma.activityLog.findMany({
                where: { boardId },
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip: offset,
                include: {
                    user: {
                        select: {
                            id: true,
                            nickname: true,
                            username: true,
                            avatar: true,
                        },
                    },
                },
            }),
            this.prisma.activityLog.count({ where: { boardId } }),
        ]);

        return { items, total };
    }
}
