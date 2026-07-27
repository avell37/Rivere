import { describe, expect, it } from 'vitest'

import { registerSchema } from './register.z.validation'

describe('registerSchema', () => {
	const validData = {
		username: 'testuser',
		email: 'test@example.com',
		password: 'secret12',
		legalAccepted: true
	}

	it('accepts valid registration data', () => {
		expect(registerSchema.safeParse(validData).success).toBe(true)
	})

	it('rejects username shorter than 4 characters', () => {
		const result = registerSchema.safeParse({
			...validData,
			username: 'abc'
		})

		expect(result.success).toBe(false)
	})

	it('rejects invalid email', () => {
		const result = registerSchema.safeParse({
			...validData,
			email: 'not-an-email'
		})

		expect(result.success).toBe(false)
	})

	it('rejects password shorter than 6 characters', () => {
		const result = registerSchema.safeParse({
			...validData,
			password: '12345'
		})

		expect(result.success).toBe(false)
	})

	it('requires legal acceptance', () => {
		const result = registerSchema.safeParse({
			...validData,
			legalAccepted: false
		})

		expect(result.success).toBe(false)
	})
})
