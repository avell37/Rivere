import { beforeEach, describe, expect, it, vi } from 'vitest'

import { loginApi } from './loginApi'

const postMock = vi.fn()

vi.mock('@/shared/api/interceptors', () => ({
	baseAxios: { post: (...args: unknown[]) => postMock(...args) }
}))

vi.mock('@/shared/libs', () => ({
	API_URL: {
		session: (url = '') => `/api/session/${url}`
	}
}))

describe('loginApi', () => {
	beforeEach(() => {
		postMock.mockReset()
		postMock.mockResolvedValue({ data: { success: true } })
	})

	it('posts login payload to session endpoint', async () => {
		await loginApi({
			login: 'user@example.com',
			password: 'secret12',
			rememberMe: true
		})

		expect(postMock).toHaveBeenCalledWith('/api/session/login', {
			login: 'user@example.com',
			password: 'secret12',
			rememberMe: true
		})
	})

	it('returns response data from api', async () => {
		postMock.mockResolvedValue({
			data: { success: true, message: 'ok' }
		})

		const result = await loginApi({
			login: 'user',
			password: 'secret12'
		})

		expect(result).toEqual({ success: true, message: 'ok' })
	})
})
