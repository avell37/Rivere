import { Priority } from './CardPriority'

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
