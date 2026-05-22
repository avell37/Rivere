import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

import { CreateInviteResponse, GetInviteResponse } from '../types/InviteProps'

export const createInvite = async (
	boardId: string
): Promise<CreateInviteResponse> => {
	const response = await authAxios.post(
		`${API_URL.boardInvites()}${boardId}/invites`
	)
	return response.data
}

export const getInviteData = async (
	token: string
): Promise<GetInviteResponse> => {
	const response = await authAxios.get(
		`${API_URL.boardInvites()}invites/${token}`
	)
	return response.data
}

export const acceptInvite = async (token: string): Promise<ActionResponse> => {
	const response = await authAxios.post(
		`${API_URL.boardInvites()}invites/${token}`
	)
	return response.data
}

export const declineInvite = async (token: string): Promise<ActionResponse> => {
	const response = await authAxios.delete(
		`${API_URL.boardInvites()}decline/${token}`
	)
	return response.data
}
