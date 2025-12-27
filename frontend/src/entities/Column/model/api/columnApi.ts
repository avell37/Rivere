import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs/constants/api.config'

export const createColumn = async (data: {
	boardId: string
	title: string
}) => {
	const response = await baseAxios.post(`${API_URL.columns()}create`, data)
	return response.data
}

export const updateColumn = async (data: {
	columnId: string
	title: string
}) => {
	const response = await baseAxios.patch(
		`${API_URL.columns()}${data.columnId}`,
		data
	)
	return response.data
}

export const deleteColumn = async (columnId: string) => {
	const response = await baseAxios.delete(`${API_URL.columns()}${columnId}`)
	return response.data
}
