export const getNotificationHref = (notification: {
	type: string
	entityId?: string
}): string | null => {
	const { type, entityId } = notification

	if (!entityId) {
		if (type === 'achievement') return '/achievements'
		return null
	}

	switch (type) {
		case 'board':
			return `/boards/${entityId}`
		case 'board_invite':
			return `/invite/${entityId}`
		case 'achievement':
			return '/achievements'
		case 'assignment':
		case 'deadline': {
			const [boardId, cardId] = entityId.includes('|')
				? entityId.split('|')
				: [null, entityId]

			if (boardId && cardId) {
				return `/boards/${boardId}?card=${cardId}`
			}

			return null
		}
		default:
			return null
	}
}
