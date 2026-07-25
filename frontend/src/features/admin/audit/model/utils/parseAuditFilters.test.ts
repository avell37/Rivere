import { describe, expect, it } from 'vitest'

import { parseAuditFilters } from './parseAuditFilters'

describe('parseAuditFilters', () => {
	it('parses page and action from search params', () => {
		const params = new URLSearchParams('page=3&action=BAN_USER')

		expect(parseAuditFilters(params)).toEqual({
			page: 3,
			action: 'BAN_USER'
		})
	})

	it('defaults invalid page to 1 and action to all', () => {
		const params = new URLSearchParams('page=0&action=all')

		expect(parseAuditFilters(params)).toEqual({
			page: 1,
			action: 'all'
		})
	})
})
