import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs/constants/api.config'

export const createColumn = async (data: {
	boardId: string
	title: string
}) => {
	const response = await baseAxios.post(`${API_URL.columns()}create`, data)
	return response.data
}
