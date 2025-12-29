import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs/constants/api.config'

export const getUserSessions = async () => {
	const response = await baseAxios.get(`${API_URL.session()}userSessions`)
	return response.data
}

export const terminateSession = async (sessionId: string) => {
	const response = await baseAxios.post(
		`${API_URL.session()}terminate/${sessionId}`
	)
	return response.data
}

export const terminateAllExceptCurrent = async () => {
	const response = await baseAxios.post(`${API_URL.session()}terminateAll`)
	return response.data
}
