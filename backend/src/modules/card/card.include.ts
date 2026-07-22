export const cardRelationsInclude = {
    assignee: {
        select: { id: true, nickname: true, avatar: true },
    },
    tags: {
        orderBy: { createdAt: 'asc' as const },
    },
};
