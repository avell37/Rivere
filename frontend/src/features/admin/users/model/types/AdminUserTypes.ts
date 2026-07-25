import { IAdminUser, UserRole } from '@/entities/User'

import { PaginatedResponse } from '@/shared/types'
import { BanDurationUnit } from '@/shared/ui/custom'

export type UsersResponse = PaginatedResponse<IAdminUser, 'users'>

export type AdminUsersStatusFilter = 'all' | 'banned'

export interface AdminUsersFilters {
	page: number
	search?: string
	role?: UserRole | 'all'
	status?: AdminUsersStatusFilter
}

export interface BanUserInput {
	userId: string
	reason: string
	duration: number
	unit: BanDurationUnit
}
