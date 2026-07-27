import { describe, expect, it } from 'vitest'

import { resolveSocketUrl } from './createSocket'

describe('resolveSocketUrl', () => {
	it('routes dev sockets to backend directly', () => {
		expect(
			resolveSocketUrl('http://localhost:3000/api/chat')
		).toBe('http://localhost:5000/api/chat')
	})

	it('uses page origin on production host', () => {
		const originalWindow = globalThis.window

		Object.defineProperty(globalThis, 'window', {
			value: {
				location: {
					hostname: 'rivere.ru',
					origin: 'https://rivere.ru'
				}
			},
			configurable: true
		})

		expect(resolveSocketUrl('http://rivere.ru/api/chat')).toBe(
			'https://rivere.ru/api/chat'
		)

		Object.defineProperty(globalThis, 'window', {
			value: originalWindow,
			configurable: true
		})
	})
})
