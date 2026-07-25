'use client'
import { BoardsSortOption, FilterableBoard } from '../types/BoardsProps'

export const filterAndSortBoards = <T extends FilterableBoard>(
	boards: T[],
	search: string,
	sort: BoardsSortOption
): T[] => {
	const normalizedSearch = search.trim().toLowerCase()

	const filtered = normalizedSearch
		? boards.filter(board =>
				board.title.toLowerCase().includes(normalizedSearch)
			)
		: boards

	return [...filtered].sort((left, right) => {
		switch (sort) {
			case 'titleAsc':
				return left.title.localeCompare(right.title)
			case 'titleDesc':
				return right.title.localeCompare(left.title)
			case 'updatedDesc':
			default:
				return (
					new Date(String(right.updatedAt ?? 0)).getTime() -
					new Date(String(left.updatedAt ?? 0)).getTime()
				)
		}
	})
}
