import { IBoard } from '@/entities/Board/model/types/IBoard'

export interface IUser {
	id: string
	username: string
	email: string
	nickname: string
	role: string
	avatar: string
	boards: IBoard[]
	createdAt: Date
	updatedAt?: Date
}

export interface IUploadedAvatar {
	url: string
	name: string
	size: number
	type: string
}

export type IUserUpdateResponse = true
