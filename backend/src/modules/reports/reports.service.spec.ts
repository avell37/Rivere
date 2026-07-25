import { Test, TestingModule } from '@nestjs/testing';
import {
    AdminAuditAction,
    ReportResolutionAction,
    ReportStatus,
    ReportTargetType,
} from '@prisma/client';
import { ReportsService } from './reports.service';
import { AdminAuditService } from '@/modules/admin/admin-audit.service';
import { EventsGateway } from '@/core/events.gateway';
import { ChatGateway } from '@/modules/chat/chat.gateway';
import { BoardGateway } from '@/modules/board/board.gateway';
import { PrismaService } from '@/core/prisma/prisma.service';

describe('ReportsService', () => {
    let service: ReportsService;

    type TransactionClient = {
        report: {
            update: jest.Mock;
        };
    };

    const prisma = {
        report: {
            findUnique: jest.fn(),
            update: jest.fn(),
        },
        $transaction: jest.fn(),
    };

    const adminAudit = {
        log: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReportsService,
                { provide: PrismaService, useValue: prisma },
                { provide: EventsGateway, useValue: { emitToUser: jest.fn() } },
                {
                    provide: ChatGateway,
                    useValue: { emitMessageDeleted: jest.fn() },
                },
                { provide: BoardGateway, useValue: { cardDeleted: jest.fn() } },
                { provide: AdminAuditService, useValue: adminAudit },
            ],
        }).compile();

        service = module.get(ReportsService);
        jest.clearAllMocks();
    });

    describe('resolveAuditAction', () => {
        const resolveAuditAction = (
            status: ReportStatus,
            action: ReportResolutionAction,
        ) =>
            (
                service as unknown as {
                    resolveAuditAction: (
                        status: ReportStatus,
                        action: ReportResolutionAction,
                    ) => AdminAuditAction;
                }
            ).resolveAuditAction(status, action);

        it('maps dismissed reports', () => {
            expect(
                resolveAuditAction(
                    ReportStatus.DISMISSED,
                    ReportResolutionAction.NONE,
                ),
            ).toBe(AdminAuditAction.REPORT_DISMISSED);
        });

        it('maps ban action', () => {
            expect(
                resolveAuditAction(
                    ReportStatus.RESOLVED,
                    ReportResolutionAction.BAN_USER,
                ),
            ).toBe(AdminAuditAction.REPORT_BAN_USER);
        });

        it('maps delete card action', () => {
            expect(
                resolveAuditAction(
                    ReportStatus.RESOLVED,
                    ReportResolutionAction.DELETE_CARD,
                ),
            ).toBe(AdminAuditAction.REPORT_DELETE_CARD);
        });

        it('maps resolve without sanctions', () => {
            expect(
                resolveAuditAction(
                    ReportStatus.RESOLVED,
                    ReportResolutionAction.NONE,
                ),
            ).toBe(AdminAuditAction.REPORT_RESOLVED);
        });
    });

    describe('resolveReport', () => {
        it('writes audit log when report is dismissed', async () => {
            prisma.report.findUnique.mockResolvedValue({
                id: 'report-1',
                status: ReportStatus.OPEN,
                targetType: ReportTargetType.USER,
                targetId: 'user-1',
                reportedUserId: 'user-1',
                reportedUser: { id: 'user-1', role: 'USER' },
            });

            prisma.$transaction.mockImplementation(
                (callback: (tx: TransactionClient) => Promise<unknown>) =>
                    callback({
                        report: {
                            update: jest.fn().mockResolvedValue({
                                id: 'report-1',
                                status: ReportStatus.DISMISSED,
                                targetType: ReportTargetType.USER,
                                targetId: 'user-1',
                                reportedUserId: 'user-1',
                            }),
                        },
                    }),
            );

            await service.resolveReport('admin-1', 'report-1', {
                status: ReportStatus.DISMISSED,
            });

            expect(adminAudit.log).toHaveBeenCalledWith(
                expect.objectContaining({
                    adminId: 'admin-1',
                    action: AdminAuditAction.REPORT_DISMISSED,
                    targetType: 'REPORT',
                    targetId: 'report-1',
                }),
            );
        });
    });
});
