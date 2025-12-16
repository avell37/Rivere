import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs/constants/api.config'

export const fetchChat = async (chatId: string) => {
	const response = await baseAxios.get(`${API_URL.chat()}${chatId}`)
	return response.data
}
