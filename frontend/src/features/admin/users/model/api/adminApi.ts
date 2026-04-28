import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import { BanUserInput, UsersResponse } from '../types/AdminUserTypes'

export const getAllUsers = async (page: number): Promise<UsersResponse> => {
	const response = await baseAxios.get(`${API_URL.admin()}admin-users`, {
		params: {
			page,
			limit: 10
		}
	})
	return response.data
}

export const banUser = async (data: BanUserInput): Promise<Boolean> => {
	const response = await baseAxios.post(`${API_URL.admin()}ban`, data)
	return response.data
}

export const unbanUser = async (userId: string): Promise<Boolean> => {
	const response = await baseAxios.post(`${API_URL.admin()}unban/${userId}`)
	return response.data
}

export const setUserRole = async (
	userId: string,
	role: string
): Promise<Boolean> => {
	const response = await baseAxios.post(`${API_URL.admin()}role/${userId}`, {
		role
	})
	return response.data
}
