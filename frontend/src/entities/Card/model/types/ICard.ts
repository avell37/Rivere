import { IChat } from '@/entities/Chat'

export enum Priority {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH'
}

export interface ICardAssignee {
	id: string
	nickname: string
	avatar: string | null
}

export interface ICardTag {
	id: string
	title: string
	background: string
}

export interface ICard {
	id: string
	title: string
	description?: string
	position: number
	priority: Priority
	deadline: string
	columnId: string
	chatId: string
	chat: IChat
	done: boolean
	assigneeId?: string | null
	assignee?: ICardAssignee | null
	tags?: ICardTag[]
	createdAt?: Date
	updatedAt?: Date
}
