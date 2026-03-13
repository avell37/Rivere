import { CSSProperties } from 'react'

import { Priority } from './CardPriority'
import { ICard } from './ICard'

export interface CardProps {
	card: ICard
}

export interface CardPropsWithBoardId extends CardProps {
	boardId: string
}

export interface CardDoneButtonProps {
	cardId: string
	done: boolean
	boardId: string
	className?: string
}

export interface ICardMoved {
	cardId: string
	fromColumnId: string
	toColumnId: string
	position: number
}

export interface ICardsReordered {
	columnId: string
	cards: ICard[]
}

export interface CardDraggingProps {
	setNodeRef: (element: HTMLElement | null) => void
	style?: CSSProperties
	title: string
	priority: Priority
	done: boolean
}
