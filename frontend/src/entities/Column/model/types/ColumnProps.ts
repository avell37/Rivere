import { CSSProperties } from 'react'

import { ICard } from '@/entities/Card'

export interface ColumnDraggingProps {
	setNodeRef: (element: HTMLElement | null) => void
	style?: CSSProperties
	title: string
	cards: ICard[]
	columnId: string
	boardId: string
}
