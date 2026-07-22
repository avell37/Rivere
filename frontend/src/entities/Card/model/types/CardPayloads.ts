import { Priority } from './ICard'

export interface CardTagPayload {
	title: string
	background: string
}

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
	assigneeId?: string | null
	tags?: CardTagPayload[]
}
