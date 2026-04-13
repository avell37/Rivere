import { Priority } from './CardPriority'

export interface CreateCardPayload {
	columnId: string
	title: string
	description?: string
	priority: Priority
	deadline?: string | null
}

export interface UpdateCardPayload {
	title?: string
	description?: string
	priority?: Priority
	deadline?: string | null
	done?: boolean
}
