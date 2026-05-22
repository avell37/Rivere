import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { BanUserInput } from './input/ban-user.input';
import { UserRole } from '@prisma/client';
import { EventsGateway } from '@/core/events.gateway';
import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly gateway: EventsGateway,
    ) {}

    async getAdminStats() {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const now = new Date();

        const [
            totalUsers,
            todayUsers,
            totalBoards,
            todayBoards,
            totalMessages,
            todayMessages,
            totalCompletedCards,
            todayCompletedCards,
            totalBanned,
            todayBanned,
        ] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.user.count({
                where: {
                    createdAt: { gte: todayStart, lte: now },
                },
            }),
            this.prisma.board.count(),
            this.prisma.board.count({
                where: {
                    createdAt: { gte: todayStart, lte: now },
                },
            }),
            this.prisma.message.count(),
            this.prisma.message.count({
                where: {
                    createdAt: { gte: todayStart, lte: now },
                },
            }),
            this.prisma.card.count({ where: { done: true } }),
            this.prisma.card.count({
                where: {
                    done: true,
                    updatedAt: { gte: todayStart, lte: now },
                },
            }),
            this.prisma.user.count({
                where: {
                    bannedUntil: {
                        gt: new Date(),
                    },
                },
            }),
            this.prisma.user.count({
                where: {
                    bannedAt: {
                        gte: todayStart,
                        lte: now,
                    },
                },
            }),
        ]);

        return {
            users: {
                total: totalUsers,
                today: todayUsers,
            },
            boards: {
                total: totalBoards,
                today: todayBoards,
            },
            messages: {
                total: totalMessages,
                today: todayMessages,
            },
            completedCards: {
                total: totalCompletedCards,
                today: todayCompletedCards,
            },
            banned: {
                total: totalBanned,
                today: todayBanned,
            },
        };
    }

    async getAllUsers(page: number, limit: number) {
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    nickname: true,
                    avatar: true,
                    role: true,
                    isEmailVerified: true,
                    userStats: true,
                    bannedUntil: true,
                    banReason: true,
                    createdAt: true,
                    updatedAt: true,

                    _count: {
                        select: {
                            boards: true,
                        },
                    },
                },
            }),

            this.prisma.user.count(),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            users,
            total,
            page,
            totalPages,
        };
    }

    async banUser(input: BanUserInput) {
        const { userId, reason, duration, unit } = input;

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException({
                code: 'errors.account.userNotFound',
                message: 'Пользователь не найден',
            });
        }

        const multipliers = {
            seconds: 1000,
            minutes: 60 * 1000,
            hours: 60 * 60 * 1000,
            days: 24 * 60 * 60 * 1000,
        };

        const durationMs = duration * multipliers[unit];

        const bannedUntil = new Date(Date.now() + durationMs);

        const now = new Date();

        await this.prisma.user.update({
            where: { id: userId },
            data: {
                bannedUntil,
                banReason: reason,
                bannedAt: now,
            },
        });

        this.gateway.emitToUser(userId, 'user:banned', {
            reason,
            bannedUntil,
        });

        return {
            success: true,
            code: 'admin.users.actions.userBanned',
            message: 'Пользователь успешно заблокирован',
        };
    }

    async unbanUser(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException({
                code: 'errors.account.userNotFound',
                message: 'Пользователь не найден',
            });
        }

        await this.prisma.user.update({
            where: { id: userId },
            data: {
                bannedUntil: null,
                banReason: null,
                bannedAt: null,
            },
        });

        this.gateway.emitToUser(userId, 'user:unbanned', {});

        return {
            success: true,
            code: 'admin.users.actions.userUnbanned',
            message: 'Пользователь успешно разблокирован',
        };
    }

    async setUserRole(userId: string, role: UserRole) {
        const allowedRoles: UserRole[] = [UserRole.ADMIN, UserRole.USER];

        if (!allowedRoles.includes(role)) {
            throw new BadRequestException({
                code: 'errors.admin.unknownRole',
                message: 'Неизвестная роль',
            });
        }

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException({
                code: 'errors.account.userNotFound',
                message: 'Пользователь не найден',
            });
        }

        if (user.role === role) {
            return true;
        }

        await this.prisma.user.update({
            where: { id: userId },
            data: { role },
        });

        this.gateway.emitToUser(userId, 'user:roleChanged', { role });

        return {
            success: true,
            code: 'admin.users.actions.userChangeRole',
            message: 'Роль пользователя успешно изменена',
        };
    }
}
