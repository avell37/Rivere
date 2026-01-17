import { UpdateCardPayload } from '@/entities/Card'

export interface EditableProps {
	cardId: string
	initialValue?: string
	t: (key: string) => string
}

export type EditableKey = 'title' | 'description' | 'priority' | 'deadline'

export type EditableValue = UpdateCardPayload[EditableKey]
