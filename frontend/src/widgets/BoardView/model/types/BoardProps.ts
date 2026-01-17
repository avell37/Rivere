import { IBoard } from '@/entities/Board'
import { ICard } from '@/entities/Card'
import { IColumn } from '@/entities/Column'

export interface BoardDragOverlayProps {
	activeColumn: IColumn | null
	activeCard: ICard | null
	boardId: string
}

export interface BoardHeaderActionsProps {
	board: IBoard
}
