import { describe, expect, it } from 'vitest'

import { getNotificationHref } from './getNotificationHref'

describe('getNotificationHref', () => {
	it('returns board href', () => {
		expect(getNotificationHref({ type: 'board', entityId: 'board-1' })).toBe(
			'/boards/board-1'
		)
	})

	it('returns invite href', () => {
		expect(
			getNotificationHref({ type: 'board_invite', entityId: 'invite-1' })
		).toBe('/invite/invite-1')
	})

	it('returns card deep link for assignment', () => {
		expect(
			getNotificationHref({
				type: 'assignment',
				entityId: 'board-1|card-1'
			})
		).toBe('/boards/board-1?card=card-1')
	})

	it('returns achievements href without entity id', () => {
		expect(getNotificationHref({ type: 'achievement' })).toBe('/achievements')
	})

	it('returns null for unknown type', () => {
		expect(
			getNotificationHref({ type: 'email_verification', entityId: 'x' })
		).toBeNull()
	})
})
