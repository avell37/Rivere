import { IBoard } from '@/entities/Board'

export type BoardsSortOption = 'updatedDesc' | 'titleAsc' | 'titleDesc'

export const filterAndSortBoards = (
	boards: IBoard[],
	search: string,
	sort: BoardsSortOption
) => {
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
