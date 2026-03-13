import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import { ISession, ISessionActionsResponse } from '../types/ISession'

export const getUserSessions = async (): Promise<ISession[]> => {
	const response = await baseAxios.get(`${API_URL.session()}userSessions`)
	return response.data
}

export const terminateSession = async (
	sessionId: string
): Promise<ISessionActionsResponse> => {
	const response = await baseAxios.post(
		`${API_URL.session()}terminate/${sessionId}`
	)
	return response.data
}

export const terminateAllExceptCurrent =
	async (): Promise<ISessionActionsResponse> => {
		const response = await baseAxios.post(
			`${API_URL.session()}terminateAll`
		)
		return response.data
	}
