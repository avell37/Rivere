import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import {
	CreateInviteResponse,
	GetInviteResponse
} from '../types/InviteResponse'

export const createInvite = async (
	boardId: string
): Promise<CreateInviteResponse> => {
	const response = await baseAxios.post(
		`${API_URL.boards()}${boardId}/invites`
	)
	return response.data
}

export const getInviteData = async (
	token: string
): Promise<GetInviteResponse> => {
	const response = await baseAxios.get(`${API_URL.boards()}invites/${token}`)
	return response.data
}

export const acceptInvite = async (token: string): Promise<boolean> => {
	const response = await baseAxios.post(`${API_URL.boards()}invites/${token}`)
	return response.data
}
