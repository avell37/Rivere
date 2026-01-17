import { EditCardRequest } from '../validation/edit-card.z.validation'

export interface EditCardProps {
	id: string
	title: string
	description?: string
	priority: EditCardRequest['priority']
	deadline: string
	done: boolean
	boardId: string
}
