import { IUserBoard } from '@/entities/Board'

export interface IUser {
	id: string
	username: string
	email: string
	nickname: string
	role: UserRole
	avatar: string
	boards: IUserBoard[]
	isEmailVerified: boolean
	bannedUntil?: string | null
	banReason?: string | null
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

export interface IAdminUser {
	id: string
	username: string
	email: string
	nickname: string
	role: UserRole
	avatar: string
	isEmailVerified: boolean
	_count: {
		boards: number
	}
	userStats: {
		id: string
		userId: string
		usersInvited: number
		dailyCompletedCards: Record<string, number>
		totalCompletedCards: number
		currentStreakDays: number
		longestStreakDays: number
		lastActiveDate: Date
		createdAt: Date
		updatedAt: Date
	}
	bannedUntil: Date | null
	banReason: string | null
	createdAt: Date
	updatedAt?: Date
}

export type UserRole = 'CREATOR' | 'ADMIN' | 'USER'
