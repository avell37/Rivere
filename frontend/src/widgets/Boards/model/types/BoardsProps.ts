export type BoardsSortOption = 'updatedDesc' | 'titleAsc' | 'titleDesc'

export type FilterableBoard = {
	id: string
	title: string
	updatedAt?: Date | string
}

export interface BoardsToolbarProps {
	search: string
	sort: BoardsSortOption
	onSearchChange: (value: string) => void
	onSortChange: (value: BoardsSortOption) => void
}
