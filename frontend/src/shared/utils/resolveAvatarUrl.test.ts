import { describe, expect, it, vi } from 'vitest'

import { resolveAvatarUrl } from './resolveAvatarUrl'

vi.mock('@/shared/libs', () => ({
	S3_URL: 'https://cdn.example.com/'
}))

describe('resolveAvatarUrl', () => {
	it('returns undefined for empty avatar', () => {
		expect(resolveAvatarUrl(null)).toBeUndefined()
	})

	it('returns external url as-is', () => {
		expect(
			resolveAvatarUrl('https://avatars.yandex.net/get-yapic/123/islands-200')
		).toBe('https://avatars.yandex.net/get-yapic/123/islands-200')
	})

	it('prefixes s3 url for internal avatars', () => {
		expect(resolveAvatarUrl('/uploads/avatar.png')).toBe(
			'https://cdn.example.com//uploads/avatar.png'
		)
	})
})
