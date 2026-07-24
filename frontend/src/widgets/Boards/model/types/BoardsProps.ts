import { BoardsSortOption } from '../lib/filterAndSortBoards'

export interface BoardsToolbarProps {
	search: string
	sort: BoardsSortOption
	onSearchChange: (value: string) => void
	onSortChange: (value: BoardsSortOption) => void
}
