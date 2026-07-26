import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

import {
	CreateColumnPayload,
	UpdateColumnPayload
} from '../types/ColumnPayload'
import { IColumn } from '../types/IColumn'
import { IArchivedColumn } from '../types/IArchivedColumn'

export const createColumnApi = async (
	data: CreateColumnPayload
): Promise<IColumn> => {
	const response = await authAxios.post(`${API_URL.columns()}create`, data)
	return response.data
}

export const updateColumnApi = async (
	data: UpdateColumnPayload
): Promise<IColumn> => {
	const response = await authAxios.patch(
		`${API_URL.columns()}${data.columnId}`,
		data
	)
	return response.data
}

export const deleteColumnApi = async (
	columnId: string
): Promise<ActionResponse> => {
	const response = await authAxios.delete(`${API_URL.columns()}${columnId}`)
	return response.data
}

export const restoreColumnApi = async (columnId: string): Promise<IColumn> => {
	const response = await authAxios.post(
		`${API_URL.columns()}${columnId}/restore`
	)
	return response.data
}

export const permanentDeleteColumnApi = async (
	columnId: string
): Promise<ActionResponse> => {
	const response = await authAxios.delete(
		`${API_URL.columns()}${columnId}/permanent`
	)
	return response.data
}

export const fetchArchivedColumnsApi = async (
	boardId: string
): Promise<IArchivedColumn[]> => {
	const response = await authAxios.get(
		`${API_URL.boards()}${boardId}/archived-columns`
	)
	return response.data
}
