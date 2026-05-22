import { IUser } from '@/entities/User'

import { BoardRole } from '@/shared/utils'

export interface IBoardMember {
	id: string
	role: BoardRole
	joinedAt: Date
	boardId: string
	userId: string
	user: IUser
	createdAt: Date
	updatedAt: Date
}
