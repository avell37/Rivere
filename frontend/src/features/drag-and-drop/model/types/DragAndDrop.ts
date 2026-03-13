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
