import { ICardTag, UpdateCardPayload } from '@/entities/Card'

export interface EditableProps {
	cardId: string
	initialValue?: string
	t: (key: string) => string
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
	tags: ICardTag[]
	t: (key: string) => string
}
