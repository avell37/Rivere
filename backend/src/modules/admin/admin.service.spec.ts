import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuditAction, UserRole } from '@prisma/client';
import { AdminService } from './admin.service';
import { AdminAuditService } from './admin-audit.service';
import { EventsGateway } from '@/core/events.gateway';
import { PrismaService } from '@/core/prisma/prisma.service';
import { BanDurationUnit } from './input/ban-user.input';

describe('AdminService', () => {
    let service: AdminService;

    const prisma = {
        user: {
            findUnique: jest.fn(),
            update: jest.fn(),
        },
    };

    const gateway = {
        emitToUser: jest.fn(),
    };

    const adminAudit = {
        log: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminService,
                { provide: PrismaService, useValue: prisma },
                { provide: EventsGateway, useValue: gateway },
                { provide: AdminAuditService, useValue: adminAudit },
            ],
        }).compile();

        service = module.get(AdminService);
        jest.clearAllMocks();
    });

    describe('banUser', () => {
        it('bans user and writes audit log', async () => {
            prisma.user.findUnique.mockResolvedValue({
                id: 'user-1',
                role: UserRole.USER,
            });
            prisma.user.update.mockResolvedValue({});

            await service.banUser('admin-1', {
                userId: 'user-1',
                reason: 'spam',
                duration: 1,
                unit: BanDurationUnit.DAYS,
            });

            expect(adminAudit.log).toHaveBeenCalledWith(
                expect.objectContaining({
                    adminId: 'admin-1',
                    action: AdminAuditAction.BAN_USER,
                    targetType: 'USER',
                    targetId: 'user-1',
                }),
            );
        });

        it('throws when banning protected role', async () => {
            prisma.user.findUnique.mockResolvedValue({
                id: 'admin-2',
                role: UserRole.ADMIN,
            });

            await expect(
                service.banUser('admin-1', {
                    userId: 'admin-2',
                    reason: 'spam',
                    duration: 1,
                    unit: BanDurationUnit.DAYS,
                }),
            ).rejects.toBeInstanceOf(ForbiddenException);
        });
    });

    describe('unbanUser', () => {
        it('unbans user and writes audit log', async () => {
            prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
            prisma.user.update.mockResolvedValue({});

            await service.unbanUser('admin-1', 'user-1');

            expect(adminAudit.log).toHaveBeenCalledWith({
                adminId: 'admin-1',
                action: AdminAuditAction.UNBAN_USER,
                targetType: 'USER',
                targetId: 'user-1',
            });
        });

        it('throws when user not found', async () => {
            prisma.user.findUnique.mockResolvedValue(null);

            await expect(
                service.unbanUser('admin-1', 'missing'),
            ).rejects.toBeInstanceOf(NotFoundException);
        });
    });

    describe('setUserRole', () => {
        it('changes role and writes audit log', async () => {
            prisma.user.findUnique.mockResolvedValue({
                id: 'user-1',
                role: UserRole.USER,
            });
            prisma.user.update.mockResolvedValue({});

            await service.setUserRole('admin-1', 'user-1', UserRole.ADMIN);

            expect(adminAudit.log).toHaveBeenCalledWith({
                adminId: 'admin-1',
                action: AdminAuditAction.ROLE_CHANGE,
                targetType: 'USER',
                targetId: 'user-1',
                metadata: {
                    oldRole: UserRole.USER,
                    newRole: UserRole.ADMIN,
                },
            });
        });
    });
});
