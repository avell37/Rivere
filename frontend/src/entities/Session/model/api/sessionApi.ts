import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

import { ISession } from '../types/ISession'

export const getUserSessions = async (): Promise<ISession[]> => {
	const response = await authAxios.get(`${API_URL.session()}userSessions`)
	return response.data
}

export const terminateSessionApi = async (
	sessionId: string
): Promise<ActionResponse> => {
	const response = await authAxios.post(
		`${API_URL.session()}terminate/${sessionId}`
	)
	return response.data
}

export const terminateAllExceptCurrentApi =
	async (): Promise<ActionResponse> => {
		const response = await authAxios.post(
			`${API_URL.session()}terminateAll`
		)
		return response.data
	}
