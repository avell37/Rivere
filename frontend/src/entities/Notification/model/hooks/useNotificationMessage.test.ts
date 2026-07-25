import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useNotificationMessage } from './useNotificationMessage'

vi.mock('next-intl', () => ({
	useTranslations: (namespace: string) => {
		const translate = (
			key: string,
			params?: Record<string, string | number>
		) => {
			if (params) {
				return `${namespace}.${key}:${JSON.stringify(params)}`
			}

			return `${namespace}.${key}`
		}

		translate.has = (key: string) =>
			namespace === 'achievements' && key === 'firstBoard.title'

		return translate
	}
}))

describe('useNotificationMessage', () => {
	it('renders localized message by key', () => {
		const { result } = renderHook(() =>
			useNotificationMessage({
				messageKey: 'boardInvite',
				messageParams: { boardTitle: 'Roadmap', nickname: 'Alex' }
			})
		)

		expect(result.current).toContain('notifications.messages.boardInvite')
		expect(result.current).toContain('Roadmap')
	})

	it('resolves achievement title from achievement code', () => {
		const { result } = renderHook(() =>
			useNotificationMessage({
				messageKey: 'achievement',
				messageParams: { achievementCode: 'firstBoard' }
			})
		)

		expect(result.current).toContain('achievements.firstBoard.title')
	})

	it('falls back to legacy message field', () => {
		const { result } = renderHook(() =>
			useNotificationMessage({
				message: 'Legacy notification text'
			})
		)

		expect(result.current).toBe('Legacy notification text')
	})
})
