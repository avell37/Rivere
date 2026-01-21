import { Priority } from './CardPriority'
import { ICard } from './ICard'

export interface CardProps {
	id: string
	title: string
	description?: string
	priority: Priority
	deadline: string
	done: boolean
	columnId: string
}

export interface CardModalProps {
	id: string
	title: string
	description?: string
	priority: Priority
	deadline: string
	done: boolean
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
