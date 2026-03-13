export interface ReorderColumns {
	boardId: string
	columns: string[]
}

export interface ReorderCards {
	columnId: string
	ids: string[]
}

export interface ReorderCardToColumn {
	cardId: string
	newColumnId: string
	position: number
}
