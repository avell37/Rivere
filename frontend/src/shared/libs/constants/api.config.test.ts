import { describe, expect, it } from 'vitest'

import { getSocketBaseUrl } from '@/shared/libs/constants/api.config'

describe('getSocketBaseUrl', () => {
	it('uses backend directly in local dev', () => {
		expect(
			getSocketBaseUrl({
				NODE_ENV: 'development',
				NEXT_PUBLIC_SERVER_URL: 'http://localhost:3000/api'
			})
		).toBe('http://localhost:5000/api')
	})

	it('keeps production url unchanged', () => {
		expect(
			getSocketBaseUrl({
				NODE_ENV: 'production',
				NEXT_PUBLIC_SERVER_URL: 'https://rivere.ru/api'
			})
		).toBe('https://rivere.ru/api')
	})

	it('respects NEXT_PUBLIC_WS_URL override', () => {
		expect(
			getSocketBaseUrl({
				NODE_ENV: 'development',
				NEXT_PUBLIC_SERVER_URL: 'http://localhost:3000/api',
				NEXT_PUBLIC_WS_URL: 'http://localhost:5000/api'
			})
		).toBe('http://localhost:5000/api')
	})
})
