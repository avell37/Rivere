import { ICardTag, UpdateCardPayload } from '@/entities/Card'

export interface EditableProps {
	cardId: string
	boardId: string
	t: (key: string) => string
	className?: string
}

export type EditableKey =
	| 'title'
	| 'description'
	| 'priority'
	| 'deadline'
	| 'assigneeId'

export type EditableValue = UpdateCardPayload[EditableKey]

export interface EditableTagsProps {
	cardId: string
	boardId: string
	tags: ICardTag[]
	t: (key: string) => string
}

export interface EditableAssigneeProps {
	cardId: string
	boardId: string
	t: (key: string) => string
}
