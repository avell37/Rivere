import { Priority } from './CardPriority'

export interface CreateCardPayload {
	columnId: string
	title: string
	description?: string
	priority: Priority
	deadline: string
}

export interface UpdateCardPayload {
	title?: string
	description?: string
	priority?: Priority
	deadline?: string
}
