import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs/constants/api.config'

export const createInvite = async (boardId: string) => {
	const response = await baseAxios.post(
		`${API_URL.boards()}invite/${boardId}`
	)
	return response.data
}

export const acceptInvite = async (token: string) => {
	const response = await baseAxios.post(
		`${API_URL.boards()}invite/accept/${token}`
	)
	return response.data
}
