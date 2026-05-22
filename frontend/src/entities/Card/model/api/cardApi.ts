import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

import { CreateCardPayload, UpdateCardPayload } from '../types/CardPayloads'
import { ICard } from '../types/ICard'

export const createCardApi = async (
	data: CreateCardPayload
): Promise<ICard> => {
	const response = await authAxios.post(`${API_URL.cards()}create`, data)
	return response.data
}

export const updateCardApi = async (
	id: string,
	data: UpdateCardPayload
): Promise<ICard> => {
	const response = await authAxios.patch(`${API_URL.cards()}${id}`, data)
	return response.data
}

export const deleteCardApi = async (id: string): Promise<ActionResponse> => {
	const response = await authAxios.delete(`${API_URL.cards()}${id}`)
	return response.data
}
