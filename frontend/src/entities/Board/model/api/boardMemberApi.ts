import { IBoardMember } from '@/entities/Board'

import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'
import { BoardRole } from '@/shared/utils'

export const getAllBoardMembersApi = async (
	boardId: string
): Promise<IBoardMember[]> => {
	const response = await authAxios.get(`${API_URL.members()}${boardId}`)
	return response.data
}

export const updateMemberRoleApi = async ({
	boardId,
	userId,
	role
}: {
	boardId: string
	userId: string
	role: BoardRole
}): Promise<ActionResponse> => {
	const response = await authAxios.patch(
		`${API_URL.members()}${boardId}/${userId}/role`,
		{ role }
	)
	return response.data
}
