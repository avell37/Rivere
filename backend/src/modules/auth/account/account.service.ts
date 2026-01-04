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
import { User } from '@prisma/client';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { FilesService } from 'src/modules/files/files.service';
import { ChangeNicknameInput } from './inputs/change-nickname';
import { saveSession } from 'src/shared/utils/session.util';
import { Request } from 'express';

@Injectable()
export class AccountService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly filesService: FilesService,
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
                createdAt: true,
            },
        });

        return user;
    }

    async create(req: Request, input: CreateUserInput) {
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

        return saveSession(req, user);
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
            },
        });

        return true;
    }

    async changePassword(input: ChangePasswordInput, userId: User) {
        const { currentPassword, newPassword } = input;

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                password: true,
            },
        });

        if (!user) {
            throw new NotFoundException({
                code: 'errors.account.userNotFound',
                message: 'Пользователь не найден',
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
                id: userId,
            },
            data: {
                password: await hash(newPassword),
            },
        });

        return true;
    }

    async changeAvatar(file: Express.Multer.File, user: User) {
        const uploaded = await this.filesService.saveFile(file, 'avatars');

        await this.prisma.user.update({
            where: { id: user.id },
            data: { avatar: uploaded.url },
        });

        return uploaded;
    }
}
