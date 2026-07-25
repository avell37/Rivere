import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

import {
	INotificationsResponse,
	NOTIFICATIONS_PAGE_SIZE
} from '../types/INotification'

export const getUserNotifications = async (
	limit = NOTIFICATIONS_PAGE_SIZE,
	offset = 0
): Promise<INotificationsResponse> => {
	const response = await authAxios.get(
		`${API_URL.notifications()}?limit=${limit}&offset=${offset}`
	)
	return response.data
}

export const markReadApi = async (id: string): Promise<ActionResponse> => {
	const response = await authAxios.patch(`${API_URL.notifications()}${id}/read`)
	return response.data
}

export const markAllReadApi = async (): Promise<ActionResponse> => {
	const response = await authAxios.patch(`${API_URL.notifications()}readAll`)
	return response.data
}

export const clearNotificationsApi = async (): Promise<ActionResponse> => {
	const response = await authAxios.delete(`${API_URL.notifications()}`)
	return response.data
}
