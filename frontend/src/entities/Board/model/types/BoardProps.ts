import { ICard } from '@/entities/Card'
import { IColumn } from '@/entities/Column'
import { TranslateValues } from '@/entities/User'

import { IBoard } from './IBoard'
import { IBoardMember } from './IBoardMember'

export interface BoardItemProps {
	id: string
	title: string
	members: number
	background: {
		url: string | null
		color: string | null
	}
	isFavorite?: boolean
}

export interface BoardMembersListProps {
	members: IBoardMember[]
	boardId: string
}

export interface BoardMemberItemProps {
	member: IBoardMember
	joinedAtText: string
	canRemove: boolean
	isLoading?: boolean
	t: (key: string, values?: TranslateValues) => string
	onRemove?: () => void
}

export interface BoardDragOverlayProps {
	activeColumn: IColumn | null
	activeCard: ICard | null
	boardId: string
}

export interface BoardHeaderActionsProps {
	board: IBoard
}
