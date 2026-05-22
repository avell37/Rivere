import { ICard } from '@/entities/Card'
import { IColumn } from '@/entities/Column'

import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import {
	ReorderCardToColumn,
	ReorderCards,
	ReorderColumns
} from '../types/ReorderPayload'

export const fetchReorderColumns = async ({
	boardId,
	columns
}: ReorderColumns): Promise<IColumn> => {
	const response = await authAxios.post(`${API_URL.columns()}reorder`, {
		boardId,
		columns
	})
	return response.data
}

export const fetchReorderCards = async ({
	columnId,
	ids
}: ReorderCards): Promise<ICard[]> => {
	const response = await authAxios.post(`${API_URL.cards()}reorder`, {
		columnId,
		ids
	})
	return response.data
}

export const fetchMoveCardToColumn = async ({
	cardId,
	newColumnId,
	position
}: ReorderCardToColumn): Promise<ICard> => {
	const response = await authAxios.post(
		`${API_URL.cards()}reorderToNewColumn`,
		{
			cardId,
			newColumnId,
			position
		}
	)
	return response.data
}
