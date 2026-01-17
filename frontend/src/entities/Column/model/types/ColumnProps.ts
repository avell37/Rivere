import { ICard } from '@/entities/Card'

import { IColumn } from './IColumn'

export interface ColumnData {
	id: string
	title: string
	cards: ICard[]
}

export interface ColumnProps extends ColumnData {
	boardId: string
}

export interface ColumnListProps {
	boardId: string
	columns: IColumn[]
}

export interface ColumnOverlayProps {
	column: IColumn
	boardId: string
}
