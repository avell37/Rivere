import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuditAction } from '@prisma/client';
import { AdminAuditService } from './admin-audit.service';
import { PrismaService } from '@/core/prisma/prisma.service';

describe('AdminAuditService', () => {
    let service: AdminAuditService;

    const prisma = {
        adminAuditLog: {
            create: jest.fn(),
            findMany: jest.fn(),
            count: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminAuditService,
                {
                    provide: PrismaService,
                    useValue: prisma,
                },
            ],
        }).compile();

        service = module.get(AdminAuditService);
        jest.clearAllMocks();
    });

    it('creates audit log entry', async () => {
        prisma.adminAuditLog.create.mockResolvedValue({ id: 'log-1' });

        await service.log({
            adminId: 'admin-1',
            action: AdminAuditAction.BAN_USER,
            targetType: 'USER',
            targetId: 'user-1',
            metadata: { reason: 'spam' },
        });

        expect(prisma.adminAuditLog.create).toHaveBeenCalledWith({
            data: {
                adminId: 'admin-1',
                action: AdminAuditAction.BAN_USER,
                targetType: 'USER',
                targetId: 'user-1',
                metadata: { reason: 'spam' },
            },
        });
    });

    it('returns paginated audit logs', async () => {
        prisma.adminAuditLog.findMany.mockResolvedValue([{ id: 'log-1' }]);
        prisma.adminAuditLog.count.mockResolvedValue(21);

        const result = await service.getLogs({
            page: 2,
            limit: 20,
            action: AdminAuditAction.UNBAN_USER,
        });

        expect(prisma.adminAuditLog.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { action: AdminAuditAction.UNBAN_USER },
                skip: 20,
                take: 20,
            }),
        );
        expect(result).toEqual({
            items: [{ id: 'log-1' }],
            total: 21,
            page: 2,
            totalPages: 2,
        });
    });
});
