import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

import { CreateCardPayload, UpdateCardPayload } from '../types/CardPayloads'
import { IArchivedCard } from '../types/IArchivedCard'
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

export const restoreCardApi = async (id: string): Promise<ICard> => {
	const response = await authAxios.post(`${API_URL.cards()}${id}/restore`)
	return response.data
}

export const permanentDeleteCardApi = async (
	id: string
): Promise<ActionResponse> => {
	const response = await authAxios.delete(`${API_URL.cards()}${id}/permanent`)
	return response.data
}

export const fetchArchivedCardsApi = async (
	boardId: string
): Promise<IArchivedCard[]> => {
	const response = await authAxios.get(
		`${API_URL.boards()}${boardId}/archived-cards`
	)
	return response.data
}
