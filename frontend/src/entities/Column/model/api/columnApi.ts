import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import {
	CreateColumnPayload,
	UpdateColumnPayload
} from '../types/ColumnPayload'
import { IColumn } from '../types/IColumn'

export const createColumn = async (
	data: CreateColumnPayload
): Promise<IColumn> => {
	const response = await baseAxios.post(`${API_URL.columns()}create`, data)
	return response.data
}

export const updateColumn = async (
	data: UpdateColumnPayload
): Promise<IColumn> => {
	const response = await baseAxios.patch(
		`${API_URL.columns()}${data.columnId}`,
		data
	)
	return response.data
}

export const deleteColumn = async (columnId: string): Promise<IColumn> => {
	const response = await baseAxios.delete(`${API_URL.columns()}${columnId}`)
	return response.data
}
