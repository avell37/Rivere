import { Dispatch, SetStateAction } from 'react'

import { ICard } from '@/entities/Card'
import { IColumn } from '@/entities/Column'

export interface DndProviderProps {
	boardId: string
	children: React.ReactNode
}

export interface DragAndDropContextProps {
	columns: IColumn[]
	activeColumn: IColumn | null
	activeCard: ICard | null
}

export interface ColumnDndProps {
	columns: IColumn[]
	setActiveColumn: (column: IColumn | null) => void
	setColumns: Dispatch<SetStateAction<IColumn[]>>
	boardId: string
}

export interface CardDndProps {
	setActiveCard: (card: ICard | null) => void
	setColumns: (columns: IColumn[] | ((prev: IColumn[]) => IColumn[])) => void
}
