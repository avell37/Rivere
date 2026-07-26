export interface IArchivedColumn {
	id: string
	title: string
	archivedAt: string
	_count: {
		cards: number
	}
}
