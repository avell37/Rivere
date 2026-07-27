import { describe, expect, it } from 'vitest'

import { loginSchema } from './login.z.validation'

describe('loginSchema', () => {
	it('accepts valid login data', () => {
		expect(
			loginSchema.safeParse({
				login: 'user@example.com',
				password: 'secret12',
				rememberMe: true
			}).success
		).toBe(true)
	})

	it('accepts login without rememberMe', () => {
		expect(
			loginSchema.safeParse({
				login: 'username',
				password: 'secret12'
			}).success
		).toBe(true)
	})

	it('rejects password shorter than 6 characters', () => {
		const result = loginSchema.safeParse({
			login: 'username',
			password: '12345'
		})

		expect(result.success).toBe(false)
	})

	it('rejects password longer than 64 characters', () => {
		const result = loginSchema.safeParse({
			login: 'username',
			password: 'a'.repeat(65)
		})

		expect(result.success).toBe(false)
	})
})
