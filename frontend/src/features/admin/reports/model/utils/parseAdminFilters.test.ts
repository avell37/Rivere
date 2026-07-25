import { describe, expect, it } from 'vitest'

import { parseFilters } from './parseAdminFilters'

describe('parseFilters', () => {
	it('parses page and status', () => {
		const params = new URLSearchParams('page=2&status=OPEN')

		expect(parseFilters(params)).toEqual({
			page: 2,
			status: 'OPEN'
		})
	})

	it('falls back to defaults for invalid values', () => {
		const params = new URLSearchParams('status=UNKNOWN')

		expect(parseFilters(params)).toEqual({
			page: 1,
			status: 'all'
		})
	})
})
