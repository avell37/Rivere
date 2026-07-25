import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

import { toAdminUsersUrl } from '../lib/admin-users-query'
import {
	AdminUsersFilters,
	BanUserInput,
	UsersResponse
} from '../types/AdminUserTypes'

export const getAllUsers = async (
	filters: AdminUsersFilters
): Promise<UsersResponse> => {
	const response = await authAxios.get(`${API_URL.admin()}admin-users`, {
		params: {
			page: filters.page,
			limit: 10,
			...(filters.search ? { search: filters.search } : {}),
			...(filters.role && filters.role !== 'all'
				? { role: filters.role }
				: {}),
			...(filters.status && filters.status !== 'all'
				? { status: filters.status }
				: {})
		}
	})
	return response.data
}

export const getAdminUsersPath = (filters: AdminUsersFilters) =>
	toAdminUsersUrl(filters)

export const banUser = async (data: BanUserInput): Promise<ActionResponse> => {
	const response = await authAxios.post(`${API_URL.admin()}ban`, data)
	return response.data
}

export const unbanUser = async (userId: string): Promise<ActionResponse> => {
	const response = await authAxios.post(`${API_URL.admin()}unban/${userId}`)
	return response.data
}

export const setUserRole = async (
	userId: string,
	role: string
): Promise<ActionResponse> => {
	const response = await authAxios.post(`${API_URL.admin()}role/${userId}`, {
		role
	})
	return response.data
}
