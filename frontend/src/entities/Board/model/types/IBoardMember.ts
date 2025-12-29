import { IUser } from '@/entities/User/model/types/IUser'

export interface IBoardMember {
	id: string
	role: string
	joinedAt: Date
	boardId: string
	userId: string
	user: IUser
	createdAt: Date
	updatedAt: Date
}
