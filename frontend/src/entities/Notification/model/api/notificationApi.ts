import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

import { INotification } from '../types/INotification'

export const getUserNotifications = async (): Promise<INotification[]> => {
	const response = await authAxios.get(`${API_URL.notifications()}`)
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
