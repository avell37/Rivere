import { CreateBoardRequest, EditBoardRequest } from '@/features/board'

import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import { IBoard } from '../types/IBoard'

export const fetchUserBoards = async (): Promise<IBoard[]> => {
	const response = await baseAxios.get(`${API_URL.boards()}userBoards`)
	return response.data
}

export const createBoard = async (
	data: CreateBoardRequest
): Promise<IBoard> => {
	const response = await baseAxios.post(`${API_URL.boards()}create`, data)
	return response.data
}

export const fetchBoardById = async (id: string): Promise<IBoard> => {
	const response = await baseAxios.get(`${API_URL.boards()}${id}`)
	return response.data
}

export const updateBoard = async ({
	boardId,
	data
}: {
	boardId: string
	data: EditBoardRequest
}): Promise<IBoard> => {
	const response = await baseAxios.patch(
		`${API_URL.boards()}${boardId}`,
		data
	)
	return response.data
}

export const deleteBoard = async (id: string): Promise<boolean> => {
	const response = await baseAxios.delete(`${API_URL.boards()}${id}`)
	return response.data
}

export const deleteMember = async (
	boardId: string,
	userId: string
): Promise<boolean> => {
	const response = await baseAxios.delete(
		`${API_URL.members()}${boardId}/${userId}`
	)
	return response.data
}
