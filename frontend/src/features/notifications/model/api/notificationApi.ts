import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs/constants/api.config'

import { INotification } from '../types/INotification'

export const getUserNotifications = async (): Promise<INotification[]> => {
	const response = await baseAxios.get(`${API_URL.notifications()}`)
	return response.data
}

export const markAllRead = async () => {
	const response = await baseAxios.patch(`${API_URL.notifications()}readAll`)
	return response.data
}

export const clearNotifications = async () => {
	const response = await baseAxios.delete(`${API_URL.notifications()}`)
	return response.data
}
