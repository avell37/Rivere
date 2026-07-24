import { Prisma } from '@prisma/client';

import { NotificationMessageKey } from './notification-message.keys';

export type CreateNotificationPayload = {
    type: string;
    messageKey: NotificationMessageKey;
    messageParams?: Prisma.InputJsonValue;
    entityId?: string;
};
