import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {
    Prisma,
    ReportResolutionAction,
    ReportStatus,
    ReportTargetType,
    UserRole,
} from '@prisma/client';
import { BanDurationUnit } from '@/modules/admin/input/ban-user.input';
import { CreateReportInput } from './input/create-report.input';
import { AdminReportsQueryInput } from './input/admin-reports-query.input';
import { ResolveReportInput } from './input/resolve-report.input';
import { PrismaService } from '@/core/prisma/prisma.service';
import { EventsGateway } from '@/core/events.gateway';
import { ChatGateway } from '@/modules/chat/chat.gateway';
import { BoardGateway } from '@/modules/board/board.gateway';
import { checkBoardAccess } from '@/shared/utils/check-board-access.util';

@Injectable()
export class ReportsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly gateway: EventsGateway,
        private readonly chatGateway: ChatGateway,
        private readonly boardGateway: BoardGateway,
    ) {}

    async createReport(reporterId: string, input: CreateReportInput) {
        const context = await this.resolveReportContext(
            reporterId,
            input.targetType,
            input.targetId,
        );

        const existing = await this.prisma.report.findFirst({
            where: {
                reporterId,
                targetType: input.targetType,
                targetId: input.targetId,
                status: ReportStatus.OPEN,
            },
        });

        if (existing) {
            throw new ConflictException({
                code: 'errors.reports.alreadyExists',
                message: 'Вы уже отправили жалобу на этот объект',
            });
        }

        const report = await this.prisma.report.create({
            data: {
                targetType: input.targetType,
                targetId: input.targetId,
                reason: input.reason.trim(),
                details: input.details?.trim() || null,
                reporterId,
                reportedUserId: context.reportedUserId,
                snapshot: context.snapshot,
            },
            select: {
                id: true,
                status: true,
                createdAt: true,
            },
        });

        return {
            success: true,
            code: 'reports.created',
            message: 'Жалоба отправлена',
            report,
        };
    }

    async getReports(query: AdminReportsQueryInput) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;

        const where: Prisma.ReportWhereInput = {};

        if (query.status) {
            where.status = query.status;
        }

        const [reports, total] = await Promise.all([
            this.prisma.report.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    reporter: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                        },
                    },
                    reportedUser: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            role: true,
                        },
                    },
                    resolvedBy: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                },
            }),
            this.prisma.report.count({ where }),
        ]);

        return {
            reports,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async resolveReport(
        adminId: string,
        reportId: string,
        input: ResolveReportInput,
    ) {
        if (input.status === ReportStatus.OPEN) {
            throw new BadRequestException({
                code: 'errors.reports.invalidStatus',
                message: 'Нельзя вернуть жалобу в статус open',
            });
        }

        const report = await this.prisma.report.findUnique({
            where: { id: reportId },
            include: {
                reportedUser: {
                    select: {
                        id: true,
                        role: true,
                    },
                },
            },
        });

        if (!report) {
            throw new NotFoundException({
                code: 'errors.reports.notFound',
                message: 'Жалоба не найдена',
            });
        }

        if (report.status !== ReportStatus.OPEN) {
            throw new ConflictException({
                code: 'errors.reports.alreadyResolved',
                message: 'Жалоба уже обработана',
            });
        }

        const action = this.resolveAction(input);

        if (
            input.status === ReportStatus.DISMISSED &&
            action !== ReportResolutionAction.NONE
        ) {
            throw new BadRequestException({
                code: 'errors.reports.invalidAction',
                message: 'Нельзя выполнить действие при отклонении жалобы',
            });
        }

        if (action === ReportResolutionAction.BAN_USER) {
            if (input.status !== ReportStatus.RESOLVED) {
                throw new BadRequestException({
                    code: 'errors.reports.invalidAction',
                    message: 'Блокировка доступна только при решении жалобы',
                });
            }

            if (!report.reportedUserId || !report.reportedUser) {
                throw new BadRequestException({
                    code: 'errors.reports.noReportedUser',
                    message: 'У жалобы нет пользователя для блокировки',
                });
            }

            if (
                report.reportedUser.role === UserRole.ADMIN ||
                report.reportedUser.role === UserRole.CREATOR
            ) {
                throw new ForbiddenException({
                    code: 'errors.admin.cannotBanProtectedRole',
                    message:
                        'Нельзя заблокировать администратора или создателя',
                });
            }

            if (!input.ban) {
                throw new BadRequestException({
                    code: 'errors.reports.banRequired',
                    message: 'Укажите параметры блокировки',
                });
            }
        }

        if (action === ReportResolutionAction.DELETE_MESSAGE) {
            if (input.status !== ReportStatus.RESOLVED) {
                throw new BadRequestException({
                    code: 'errors.reports.invalidAction',
                    message: 'Удаление доступно только при решении жалобы',
                });
            }

            if (report.targetType !== ReportTargetType.MESSAGE) {
                throw new BadRequestException({
                    code: 'errors.reports.invalidAction',
                    message: 'Удаление доступно только для жалоб на сообщение',
                });
            }
        }

        if (action === ReportResolutionAction.DELETE_CARD) {
            if (input.status !== ReportStatus.RESOLVED) {
                throw new BadRequestException({
                    code: 'errors.reports.invalidAction',
                    message: 'Удаление доступно только при решении жалобы',
                });
            }

            if (report.targetType !== ReportTargetType.CARD) {
                throw new BadRequestException({
                    code: 'errors.reports.invalidAction',
                    message: 'Удаление доступно только для жалоб на карточку',
                });
            }
        }

        const {
            report: updatedReport,
            deletedMessage,
            deletedCard,
            bannedUserId,
            banPayload,
        } = await this.prisma.$transaction(async (tx) => {
            let deletedMessageResult: {
                chatId: string;
                id: string;
                deletedAt: Date;
            } | null = null;
            let deletedCardResult: {
                boardId: string;
                id: string;
            } | null = null;
            let bannedUserIdResult: string | null = null;
            let banPayloadResult: { reason: string; bannedUntil: Date } | null =
                null;

            if (action === ReportResolutionAction.BAN_USER && input.ban) {
                const bannedUntil = this.calculateBannedUntil(
                    input.ban.duration,
                    input.ban.unit,
                );
                const now = new Date();

                await tx.user.update({
                    where: { id: report.reportedUserId! },
                    data: {
                        bannedUntil,
                        banReason: input.ban.reason.trim(),
                        bannedAt: now,
                    },
                });

                bannedUserIdResult = report.reportedUserId;
                banPayloadResult = {
                    reason: input.ban.reason.trim(),
                    bannedUntil,
                };
            }

            if (action === ReportResolutionAction.DELETE_MESSAGE) {
                const message = await tx.message.findUnique({
                    where: { id: report.targetId },
                    select: {
                        id: true,
                        chatId: true,
                        deletedAt: true,
                    },
                });

                if (!message) {
                    throw new NotFoundException({
                        code: 'errors.messages.notFound',
                        message: 'Сообщение не найдено',
                    });
                }

                if (message.deletedAt) {
                    throw new BadRequestException({
                        code: 'errors.messages.alreadyDeleted',
                        message: 'Сообщение уже удалено',
                    });
                }

                const deletedAt = new Date();

                await tx.message.update({
                    where: { id: message.id },
                    data: { deletedAt },
                });

                deletedMessageResult = {
                    id: message.id,
                    chatId: message.chatId,
                    deletedAt,
                };
            }

            if (action === ReportResolutionAction.DELETE_CARD) {
                const card = await tx.card.findUnique({
                    where: { id: report.targetId },
                    select: {
                        id: true,
                        column: { select: { boardId: true } },
                    },
                });

                if (!card) {
                    throw new NotFoundException({
                        code: 'errors.card.notFound',
                        message: 'Карточка не найдена',
                    });
                }

                await tx.card.delete({
                    where: { id: card.id },
                });

                deletedCardResult = {
                    id: card.id,
                    boardId: card.column.boardId,
                };
            }

            const updatedReport = await tx.report.update({
                where: { id: reportId },
                data: {
                    status: input.status,
                    resolutionNote: input.resolutionNote?.trim() || null,
                    resolutionAction: action,
                    resolvedById: adminId,
                    resolvedAt: new Date(),
                },
                include: {
                    reporter: {
                        select: { id: true, username: true, email: true },
                    },
                    reportedUser: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            role: true,
                        },
                    },
                    resolvedBy: {
                        select: { id: true, username: true },
                    },
                },
            });

            return {
                report: updatedReport,
                deletedMessage: deletedMessageResult,
                deletedCard: deletedCardResult,
                bannedUserId: bannedUserIdResult,
                banPayload: banPayloadResult,
            };
        });

        if (bannedUserId && banPayload) {
            this.gateway.emitToUser(bannedUserId, 'user:banned', banPayload);
        }

        if (deletedMessage) {
            this.chatGateway.emitMessageDeleted(deletedMessage.chatId, {
                id: deletedMessage.id,
                deletedAt: deletedMessage.deletedAt.toISOString(),
            });
        }

        if (deletedCard) {
            this.boardGateway.cardDeleted(deletedCard.boardId, deletedCard.id);
        }

        return updatedReport;
    }

    private resolveAction(input: ResolveReportInput): ReportResolutionAction {
        if (input.status === ReportStatus.DISMISSED) {
            return ReportResolutionAction.NONE;
        }

        return input.action ?? ReportResolutionAction.NONE;
    }

    private calculateBannedUntil(duration: number, unit: BanDurationUnit) {
        const multipliers = {
            [BanDurationUnit.SECONDS]: 1000,
            [BanDurationUnit.MINUTES]: 60 * 1000,
            [BanDurationUnit.HOURS]: 60 * 60 * 1000,
            [BanDurationUnit.DAYS]: 24 * 60 * 60 * 1000,
        };

        return new Date(Date.now() + duration * multipliers[unit]);
    }

    private async resolveReportContext(
        reporterId: string,
        targetType: ReportTargetType,
        targetId: string,
    ) {
        switch (targetType) {
            case ReportTargetType.MESSAGE:
                return this.resolveMessageReport(reporterId, targetId);
            case ReportTargetType.USER:
                return this.resolveUserReport(reporterId, targetId);
            case ReportTargetType.CARD:
                return this.resolveCardReport(reporterId, targetId);
            default:
                throw new BadRequestException({
                    code: 'errors.reports.invalidTarget',
                    message: 'Неподдерживаемый тип жалобы',
                });
        }
    }

    private async resolveMessageReport(reporterId: string, messageId: string) {
        const message = await this.prisma.message.findUnique({
            where: { id: messageId },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        nickname: true,
                    },
                },
                chat: {
                    include: {
                        card: {
                            select: {
                                id: true,
                                title: true,
                                column: { select: { boardId: true } },
                            },
                        },
                    },
                },
            },
        });

        if (!message) {
            throw new NotFoundException({
                code: 'errors.messages.notFound',
                message: 'Сообщение не найдено',
            });
        }

        if (message.deletedAt) {
            throw new BadRequestException({
                code: 'errors.messages.alreadyDeleted',
                message: 'Сообщение уже удалено',
            });
        }

        if (message.userId === reporterId) {
            throw new BadRequestException({
                code: 'errors.reports.selfReport',
                message: 'Нельзя пожаловаться на собственное сообщение',
            });
        }

        const boardId = message.chat.card.column.boardId;

        await checkBoardAccess({
            prisma: this.prisma,
            userId: reporterId,
            boardId,
        });

        return {
            reportedUserId: message.userId,
            snapshot: {
                messageText: message.text,
                messageId: message.id,
                chatId: message.chatId,
                cardId: message.chat.cardId,
                cardTitle: message.chat.card.title,
                boardId,
                author: message.user,
            } as Prisma.InputJsonValue,
        };
    }

    private async resolveUserReport(reporterId: string, userId: string) {
        if (reporterId === userId) {
            throw new BadRequestException({
                code: 'errors.reports.selfReport',
                message: 'Нельзя пожаловаться на себя',
            });
        }

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                nickname: true,
                role: true,
            },
        });

        if (!user) {
            throw new NotFoundException({
                code: 'errors.account.userNotFound',
                message: 'Пользователь не найден',
            });
        }

        if (user.role === 'ADMIN' || user.role === 'CREATOR') {
            throw new ForbiddenException({
                code: 'errors.reports.protectedUser',
                message: 'Нельзя пожаловаться на этого пользователя',
            });
        }

        return {
            reportedUserId: user.id,
            snapshot: { user } as Prisma.InputJsonValue,
        };
    }

    private async resolveCardReport(reporterId: string, cardId: string) {
        const card = await this.prisma.card.findUnique({
            where: { id: cardId },
            select: {
                id: true,
                title: true,
                description: true,
                column: { select: { boardId: true } },
            },
        });

        if (!card) {
            throw new NotFoundException({
                code: 'errors.card.notFound',
                message: 'Карточка не найдена',
            });
        }

        await checkBoardAccess({
            prisma: this.prisma,
            userId: reporterId,
            boardId: card.column.boardId,
        });

        return {
            reportedUserId: null,
            snapshot: {
                cardId: card.id,
                cardTitle: card.title,
                cardDescription: card.description,
                boardId: card.column.boardId,
            } as Prisma.InputJsonValue,
        };
    }
}
