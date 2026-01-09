import { CreateBoardRequest } from '@/features/board/create/model/validation/create-board.z.validation'

import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs/constants/api.config'

import { IBoard } from '../types/IBoard'

export const fetchUserBoards = async (): Promise<IBoard[]> => {
	const response = await baseAxios.get(`${API_URL.boards()}userBoards`)
	return response.data
}

export const createBoard = async (data: CreateBoardRequest) => {
	const response = await baseAxios.post(`${API_URL.boards()}create`, data)
	return response.data
}

export const fetchBoardById = async (id: string): Promise<IBoard> => {
	const response = await baseAxios.get(`${API_URL.boards()}${id}`)
	return response.data
}
