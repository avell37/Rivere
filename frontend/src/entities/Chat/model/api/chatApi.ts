import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import { IChat } from '../types/IChat'

export const fetchChat = async (cardId: string): Promise<IChat> => {
	const response = await baseAxios.get(`${API_URL.cards()}${cardId}/chat`)
	return response.data
}
