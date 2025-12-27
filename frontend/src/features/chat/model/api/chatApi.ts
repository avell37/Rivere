import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs/constants/api.config'

export const fetchChat = async (cardId: string) => {
	const response = await baseAxios.get(`${API_URL.cards()}${cardId}/chat`)
	return response.data
}
