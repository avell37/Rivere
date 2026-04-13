import { IUserBoard } from '@/entities/Board'

export interface IUser {
	id: string
	username: string
	email: string
	nickname: string
	role: string
	avatar: string
	boards: IUserBoard[]
	isEmailVerified: boolean
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
