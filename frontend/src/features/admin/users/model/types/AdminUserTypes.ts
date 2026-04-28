import { IAdminUser } from '@/entities/User'

export interface UsersResponse {
	users: IAdminUser[]
	total: number
	page: number
	totalPages: number
}

export interface BanUserInput {
	userId: string
	reason: string
	durationInHours: number
}
