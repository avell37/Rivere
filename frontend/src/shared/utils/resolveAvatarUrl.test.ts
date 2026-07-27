import { describe, expect, it, vi } from 'vitest'

import { resolveAvatarUrl } from './resolveAvatarUrl'

vi.mock('@/shared/libs', () => ({
	S3_URL: 'https://cdn.example.com'
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

	it('joins s3 base and avatar key with a slash', () => {
		expect(resolveAvatarUrl('abc123.jpg')).toBe(
			'https://cdn.example.com/abc123.jpg'
		)
	})

	it('normalizes duplicate slashes', () => {
		expect(resolveAvatarUrl('/uploads/avatar.png')).toBe(
			'https://cdn.example.com/uploads/avatar.png'
		)
	})
})
