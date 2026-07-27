import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import {
    BOARD_ROLE_PERMISSIONS,
    checkBoardPermission,
    hasPermission,
    isValidRole,
} from './board-permissions';
import { BoardPermission } from '../types/board-permissions.enum';

describe('board-permissions', () => {
    describe('isValidRole', () => {
        it('returns true for known board roles', () => {
            expect(isValidRole('OWNER')).toBe(true);
            expect(isValidRole('ADMIN')).toBe(true);
            expect(isValidRole('MEMBER')).toBe(true);
        });

        it('returns false for unknown roles', () => {
            expect(isValidRole('GUEST')).toBe(false);
        });
    });

    describe('hasPermission', () => {
        it('allows owner to delete board', () => {
            expect(
                hasPermission(Role.OWNER, BoardPermission.DELETE_BOARD),
            ).toBe(true);
        });

        it('denies member from deleting board', () => {
            expect(
                hasPermission(Role.MEMBER, BoardPermission.DELETE_BOARD),
            ).toBe(false);
        });

        it('allows member to create cards', () => {
            expect(
                hasPermission(Role.MEMBER, BoardPermission.CREATE_CARD),
            ).toBe(true);
        });

        it('denies member from deleting columns', () => {
            expect(
                hasPermission(Role.MEMBER, BoardPermission.DELETE_COLUMN),
            ).toBe(false);
        });
    });

    describe('BOARD_ROLE_PERMISSIONS', () => {
        it('gives admin more permissions than member', () => {
            expect(BOARD_ROLE_PERMISSIONS.ADMIN.length).toBeGreaterThan(
                BOARD_ROLE_PERMISSIONS.MEMBER.length,
            );
        });
    });

    describe('checkBoardPermission', () => {
        const prisma = {
            boardMember: {
                findFirst: jest.fn(),
            },
        };

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('throws when member is not found', async () => {
            prisma.boardMember.findFirst.mockResolvedValue(null);

            await expect(
                checkBoardPermission({
                    prisma: prisma as never,
                    userId: 'user-1',
                    boardId: 'board-1',
                    permission: BoardPermission.CREATE_CARD,
                }),
            ).rejects.toBeInstanceOf(NotFoundException);
        });

        it('throws when role lacks permission', async () => {
            prisma.boardMember.findFirst.mockResolvedValue({
                role: Role.MEMBER,
            });

            await expect(
                checkBoardPermission({
                    prisma: prisma as never,
                    userId: 'user-1',
                    boardId: 'board-1',
                    permission: BoardPermission.DELETE_BOARD,
                }),
            ).rejects.toBeInstanceOf(ForbiddenException);
        });

        it('returns member when permission is granted', async () => {
            const member = { role: Role.ADMIN, userId: 'user-1' };
            prisma.boardMember.findFirst.mockResolvedValue(member);

            const result = await checkBoardPermission({
                prisma: prisma as never,
                userId: 'user-1',
                boardId: 'board-1',
                permission: BoardPermission.INVITE_USERS,
            });

            expect(result).toEqual(member);
        });
    });
});
