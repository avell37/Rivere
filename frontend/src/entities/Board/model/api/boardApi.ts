import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

import { IBoard } from '../types/IBoard'
import { CreateBoardRequest } from '../validation/create-board.z.validation'
import { EditBoardRequest } from '../validation/edit-board.z.validation'

export const fetchUserBoards = async (): Promise<IBoard[]> => {
	const response = await authAxios.get(`${API_URL.boards()}userBoards`)
	return response.data
}

export const createBoardApi = async (
	data: CreateBoardRequest
): Promise<IBoard> => {
	const response = await authAxios.post(`${API_URL.boards()}create`, data)
	return response.data
}

export const fetchBoardById = async (id: string): Promise<IBoard> => {
	const response = await authAxios.get(`${API_URL.boards()}${id}`)
	return response.data
}

export const updateBoardApi = async ({
	boardId,
	data
}: {
	boardId: string
	data: EditBoardRequest
}): Promise<IBoard> => {
	const response = await authAxios.patch(
		`${API_URL.boards()}${boardId}`,
		data
	)
	return response.data
}

export const toggleFavoriteApi = async (
	boardId: string
): Promise<ActionResponse> => {
	const response = await authAxios.post(
		`${API_URL.boards()}${boardId}/favorite`
	)
	return response.data
}

export const deleteBoardApi = async (id: string): Promise<ActionResponse> => {
	const response = await authAxios.delete(`${API_URL.boards()}${id}`)
	return response.data
}

export const deleteMemberApi = async (
	boardId: string,
	userId: string
): Promise<ActionResponse> => {
	const response = await authAxios.delete(
		`${API_URL.members()}${boardId}/${userId}`
	)
	return response.data
}
