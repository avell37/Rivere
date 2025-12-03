import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs/constants/api.config'

export const fetchReorderColumns = async ({
	boardId,
	columns
}: {
	boardId: string
	columns: string[]
}) => {
	const response = await baseAxios.post(`${API_URL.columns()}reorder`, {
		boardId,
		columns
	})
	return response.data
}

export const fetchReorderCards = async ({
	columnId,
	cards
}: {
	columnId: string
	cards: string[]
}) => {
	const response = await baseAxios.post(`${API_URL.cards()}reorder`, {
		columnId,
		cards
	})
	return response.data
}

export const fetchMoveCardToColumn = async ({
	cardId,
	newColumnId,
	position
}: {
	cardId: string
	newColumnId: string
	position: number
}) => {
	const response = await baseAxios.post(
		`${API_URL.cards()}reorderToNewColumn`,
		{
			cardId,
			newColumnId,
			position
		}
	)
	return response.data
}
