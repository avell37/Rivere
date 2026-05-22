import { IChat } from '@/entities/Chat'

export enum Priority {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH'
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
	createdAt?: Date
	updatedAt?: Date
}
