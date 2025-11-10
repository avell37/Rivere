import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { hash, verify } from 'argon2';
import { ChangeUsernameInput } from './inputs/change-username.input';
import { User } from '@prisma/client';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';

@Injectable()
export class AccountService {
    constructor(private readonly prisma: PrismaService) {}

    async me(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                displayUsername: true,
                avatar: true,
                boards: true,
                createdAt: true,
            },
        });

        return user;
    }

    async create(input: CreateUserInput) {
        const { username, email, password } = input;

        const isUsernameExists = await this.prisma.user.findUnique({
            where: { username },
        });

        if (isUsernameExists) {
            throw new ConflictException('Это имя пользователя уже занято');
        }

        const isEmailExists = await this.prisma.user.findUnique({
            where: { email },
        });

        if (isEmailExists) {
            throw new ConflictException('Эта почта уже занята');
        }

        const user = await this.prisma.user.create({
            data: {
                username,
                email,
                password: await hash(password),
                displayUsername: username,
            },
        });

        return true;
    }

    async changeUsername(input: ChangeUsernameInput, user: User) {
        const { username } = input;

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

    async changeEmail(input: ChangeEmailInput, user: User) {
        const { email } = input;

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

    async changePassword(input: ChangePasswordInput, user: User) {
        const { oldPassword, newPassword } = input;

        const isValidPassword = await verify(user.password, oldPassword);

        if (!isValidPassword) {
            throw new UnauthorizedException('Неверный старый пароль');
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
}
