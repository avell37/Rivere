import { IUser } from '@/entities/User'

export interface IBoardMember {
	id: string
	role: 'OWNER' | 'ADMIN' | 'MEMBER'
	joinedAt: Date
	boardId: string
	userId: string
	user: IUser
	createdAt: Date
	updatedAt: Date
}
