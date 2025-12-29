import { IBoard } from '@/entities/Board/model/types/IBoard'

export interface IUser {
	id: string
	username: string
	email: string
	nickname: string
	avatar: string
	boards: IBoard[]
	createdAt: Date
	updatedAt?: Date
}
