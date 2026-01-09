import { IUser } from '@/entities/User/model/types/IUser'

export interface INotification {
	id: string
	type: string
	message: string
	entityId?: string
	read: boolean
	createdAt: string
	user: IUser
	userId: string
}
