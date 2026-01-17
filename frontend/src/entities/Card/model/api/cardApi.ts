import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import { CreateCardPayload, UpdateCardPayload } from '../types/CardPayloads'
import { ICard } from '../types/ICard'

export const createCard = async (data: CreateCardPayload): Promise<ICard> => {
	const response = await baseAxios.post(`${API_URL.cards()}create`, data)
	return response.data
}

export const updateCard = async (
	id: string,
	data: UpdateCardPayload
): Promise<ICard> => {
	const response = await baseAxios.patch(`${API_URL.cards()}${id}`, data)
	return response.data
}

export const deleteCard = async (id: string): Promise<ICard> => {
	const response = await baseAxios.delete(`${API_URL.cards()}${id}`)
	return response.data
}
