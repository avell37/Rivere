import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { hash, verify } from 'argon2';
import { ChangeUsernameInput } from './inputs/change-username.input';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { FilesService } from 'src/modules/files/files.service';
import { ChangeNicknameInput } from './inputs/change-nickname';
import { StatisticsService } from 'src/modules/statistics/statistics.service';
import { VerificationService } from '../verification/verification.service';
import { getSessionMetadata } from 'src/shared/utils/session-metadata.util';
import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { saveSession } from 'src/shared/utils/session.util';
import { User } from '@prisma/client';

@Injectable()
export class AccountService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly filesService: FilesService,
        private readonly statistics: StatisticsService,
        private readonly verificationService: VerificationService,
        private readonly config: ConfigService,
    ) {}

    async me(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                nickname: true,
                role: true,
                avatar: true,
                boards: true,
                isEmailVerified: true,
                banReason: true,
                bannedUntil: true,
                createdAt: true,
            },
        });

        return user;
    }

    async create(req: Request, input: CreateUserInput, userAgent: string) {
        const { username, email, password } = input;

        const isUsernameExists = await this.prisma.user.findUnique({
            where: { username },
        });

        if (isUsernameExists) {
            throw new ConflictException({
                code: 'errors.account.usernameExists',
                message: 'Имя пользователя уже занято',
            });
        }

        const isEmailExists = await this.prisma.user.findUnique({
            where: { email },
        });

        if (isEmailExists) {
            throw new ConflictException({
                code: 'errors.account.emailExists',
                message: 'Электронная почта уже занята',
            });
        }

        const user = await this.prisma.user.create({
            data: {
                username,
                email,
                password: await hash(password),
                nickname: username,
            },
        });

        await this.verificationService.sendVerificationToken(user);

        await this.statistics.getOrCreate(user.id);

        const metadata = getSessionMetadata(req, userAgent, this.config);

        return saveSession(req, user, metadata);
    }

    async changeUsername(input: ChangeUsernameInput, user: User) {
        const { username } = input;

        const isUsernameExists = await this.prisma.user.findUnique({
            where: { username },
        });

        if (isUsernameExists) {
            throw new BadRequestException({
                code: 'errors.account.usernameExists',
                message: 'Имя пользователя уже занято',
            });
        }

        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                username,
            },
        });

        return true;
    }

    async changeNickname(input: ChangeNicknameInput, user: User) {
        const { nickname } = input;

        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                nickname,
            },
        });

        return true;
    }

    async changeEmail(input: ChangeEmailInput, user: User) {
        const { email } = input;

        const isEmailExists = await this.prisma.user.findUnique({
            where: { email },
        });

        if (isEmailExists) {
            throw new BadRequestException({
                code: 'errors.account.emailExists',
                message: 'Электронная почта уже занята',
            });
        }

        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                email,
                isEmailVerified: false,
            },
        });

        return true;
    }

    async changePassword(input: ChangePasswordInput, user: User) {
        const { currentPassword, newPassword } = input;

        const currentUser = await this.prisma.user.findUnique({
            where: { id: user.id },
            select: {
                password: true,
            },
        });

        if (!currentUser) {
            throw new NotFoundException({
                code: 'errors.account.userNotFound',
                message: 'Пользователь не найден',
            });
        }

        if (newPassword === currentPassword) {
            throw new BadRequestException({
                code: 'errors.account.passwordSameAsCurrent',
                message: 'Новый пароль совпадает со старым.',
            });
        }

        const isValidPassword = await verify(user.password, currentPassword);

        if (!isValidPassword) {
            throw new BadRequestException({
                code: 'errors.account.invalidCurrentPassword',
                message: 'Неверный текущий пароль',
            });
        }

        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: await hash(newPassword),
            },
        });

        return true;
    }

    async changeAvatar(file: Express.Multer.File, user: User) {
        const existingUser = await this.prisma.user.findUnique({
            where: { id: user.id },
            select: {
                avatar: true,
            },
        });

        if (existingUser?.avatar) {
            await this.filesService.delete(existingUser.avatar);
        }

        const uploaded = await this.filesService.upload(file);

        await this.prisma.user.update({
            where: { id: user.id },
            data: { avatar: uploaded },
        });

        return uploaded;
    }
}
