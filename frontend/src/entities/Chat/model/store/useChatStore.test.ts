import { describe, expect, it } from 'vitest'

import { useChatStore } from './useChatStore'

describe('useChatStore', () => {
	it('marks message as deleted', () => {
		useChatStore.setState({
			messages: [
				{
					id: 'm1',
					text: 'Hello',
					userId: 'u1',
					user: { avatar: null, nickname: 'Alex' },
					createdAt: '2026-07-25T00:00:00.000Z',
					updatedAt: '2026-07-25T00:00:00.000Z'
				}
			]
		})

		useChatStore
			.getState()
			.markMessageDeleted('m1', '2026-07-25T01:00:00.000Z')

		expect(useChatStore.getState().messages[0].deletedAt).toBe(
			'2026-07-25T01:00:00.000Z'
		)
	})
})
