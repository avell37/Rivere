import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

export const sendVerifyToken = async (): Promise<Boolean> => {
	const response = await baseAxios.post(`${API_URL.verification()}send-token`)
	return response.data
}

export const verifyAccount = async (code: string) => {
	const response = await baseAxios.post(
		`${API_URL.verification()}verify-account`,
		JSON.stringify({ token: code })
	)
	return response.data
}
