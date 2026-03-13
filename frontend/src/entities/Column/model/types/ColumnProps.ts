import { CSSProperties } from 'react'

import { ICard } from '@/entities/Card'

import { IColumn } from './IColumn'

export interface ColumnData {
	id: string
}

export interface ColumnProps {
	column: IColumn
}

export interface ColumnListProps {
	boardId: string
}

export interface ColumnOverlayProps {
	column: IColumn
	boardId: string
}

export interface ColumnDraggingProps {
	setNodeRef: (element: HTMLElement | null) => void
	style?: CSSProperties
	title: string
	cards: ICard[]
	columnId: string
	boardId: string
}
