import { IAdminUser, UserRole } from '@/entities/User'

export interface UsersResponse {
	users: IAdminUser[]
	total: number
	page: number
	totalPages: number
}

export type AdminUsersStatusFilter = 'all' | 'banned'

export interface AdminUsersFilters {
	page: number
	search?: string
	role?: UserRole | 'all'
	status?: AdminUsersStatusFilter
}

export enum BanDurationUnit {
	SECONDS = 'seconds',
	MINUTES = 'minutes',
	HOURS = 'hours',
	DAYS = 'days'
}

export interface BanUserInput {
	userId: string
	reason: string
	duration: number
	unit: BanDurationUnit
}
