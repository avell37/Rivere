import { describe, expect, it } from 'vitest'

import { filterAndSortBoards } from './filterAndSortBoards'

const boards = [
	{
		id: '1',
		title: 'Zeta board',
		updatedAt: '2026-07-20T00:00:00.000Z'
	},
	{
		id: '2',
		title: 'Alpha board',
		updatedAt: '2026-07-25T00:00:00.000Z'
	},
	{
		id: '3',
		title: 'Beta board',
		updatedAt: '2026-07-22T00:00:00.000Z'
	}
]

describe('filterAndSortBoards', () => {
	it('filters boards by title', () => {
		const result = filterAndSortBoards(boards, 'alpha', 'updatedDesc')

		expect(result).toHaveLength(1)
		expect(result[0].title).toBe('Alpha board')
	})

	it('sorts boards by title ascending', () => {
		const result = filterAndSortBoards(boards, '', 'titleAsc')

		expect(result.map(board => board.title)).toEqual([
			'Alpha board',
			'Beta board',
			'Zeta board'
		])
	})

	it('sorts boards by updated date descending', () => {
		const result = filterAndSortBoards(boards, '', 'updatedDesc')

		expect(result.map(board => board.id)).toEqual(['2', '3', '1'])
	})
})
