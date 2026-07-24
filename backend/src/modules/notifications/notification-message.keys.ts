export const NotificationMessageKey = {
    ASSIGNMENT: 'assignment',
    DEADLINE: 'deadline',
    ACHIEVEMENT: 'achievement',
    BOARD_INVITE: 'boardInvite',
    BOARD_INVITE_ACCEPTED: 'boardInviteAccepted',
    BOARD_INVITE_DECLINED: 'boardInviteDeclined',
    EMAIL_VERIFICATION: 'emailVerification',
} as const;

export type NotificationMessageKey =
    (typeof NotificationMessageKey)[keyof typeof NotificationMessageKey];
