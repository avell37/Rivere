import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import {
	INotification,
	INotificationActionResponse
} from '../types/INotification'

export const getUserNotifications = async (): Promise<INotification[]> => {
	const response = await baseAxios.get(`${API_URL.notifications()}`)
	return response.data
}

export const markAllRead = async (): Promise<INotificationActionResponse> => {
	const response = await baseAxios.patch(`${API_URL.notifications()}readAll`)
	return response.data
}

export const clearNotifications =
	async (): Promise<INotificationActionResponse> => {
		const response = await baseAxios.delete(`${API_URL.notifications()}`)
		return response.data
	}
