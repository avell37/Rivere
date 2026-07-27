import { beforeEach, describe, expect, it, vi } from 'vitest'

import { register } from './registerApi'

const postMock = vi.fn()

vi.mock('@/shared/api/interceptors', () => ({
	baseAxios: { post: (...args: unknown[]) => postMock(...args) }
}))

vi.mock('@/shared/libs', () => ({
	API_URL: {
		auth: (url = '') => `/api/account/${url}`
	}
}))

describe('register', () => {
	beforeEach(() => {
		postMock.mockReset()
		postMock.mockResolvedValue({ data: { success: true } })
	})

	it('sends only auth fields without legalAccepted', async () => {
		await register({
			username: 'testuser',
			email: 'test@example.com',
			password: 'secret12',
			legalAccepted: true
		})

		expect(postMock).toHaveBeenCalledWith('/api/account/create', {
			username: 'testuser',
			email: 'test@example.com',
			password: 'secret12'
		})
	})

	it('returns response data from api', async () => {
		postMock.mockResolvedValue({
			data: { success: true, message: 'created' }
		})

		const result = await register({
			username: 'testuser',
			email: 'test@example.com',
			password: 'secret12',
			legalAccepted: true
		})

		expect(result).toEqual({ success: true, message: 'created' })
	})
})
