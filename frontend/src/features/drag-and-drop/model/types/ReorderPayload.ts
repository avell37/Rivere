export interface ReorderColumns {
	boardId: string
	columns: string[]
}

export interface ReorderCards {
	columnId: string
	cards: string[]
}

export interface ReorderCardToColumn {
	cardId: string
	newColumnId: string
	position: number
}
