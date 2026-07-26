import { Prisma } from '@prisma/client';

export type MessageWithBoard = Prisma.MessageGetPayload<{
    include: {
        user: true;
        chat: {
            include: {
                card: {
                    include: {
                        column: {
                            include: {
                                board: {
                                    include: {
                                        members: true;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
}>;
