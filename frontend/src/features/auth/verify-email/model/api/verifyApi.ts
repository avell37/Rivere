import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

export const sendVerifyToken = async (): Promise<ActionResponse> => {
	const response = await baseAxios.post(`${API_URL.verification()}send-token`)
	return response.data
}

export const verifyAccount = async (code: string): Promise<ActionResponse> => {
	const response = await baseAxios.post(
		`${API_URL.verification()}verify-account`,
		JSON.stringify({ token: code })
	)
	return response.data
}
