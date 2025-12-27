import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs/constants/api.config'

import { CreateCardPayload, UpdateCardPayload } from '../types/CardPayloads'

export const createCard = async (data: CreateCardPayload) => {
	const response = await baseAxios.post(`${API_URL.cards()}create`, data)
	return response.data
}

export const updateCard = async (id: string, data: UpdateCardPayload) => {
	const response = await baseAxios.patch(`${API_URL.cards()}${id}`, data)
	return response.data
}

export const deleteCard = async (id: string) => {
	const response = await baseAxios.delete(`${API_URL.cards()}${id}`)
	return response.data
}
