import { ICardAssignee, ICardTag, Priority } from './ICard'

export interface IArchivedCard {
	id: string
	title: string
	description?: string | null
	position: number
	priority: Priority
	deadline: string | null
	done: boolean
	columnId: string
	archivedAt: string
	column: {
		id: string
		title: string
	}
	assignee?: ICardAssignee | null
	tags?: ICardTag[]
}
