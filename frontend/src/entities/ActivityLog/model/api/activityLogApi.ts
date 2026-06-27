import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import { IActivityLogResponse } from '../types/IActivityLog'

export const getBoardActivityLogApi = async (
	boardId: string,
	limit = 50,
	offset = 0
): Promise<IActivityLogResponse> => {
	const response = await authAxios.get(
		`${API_URL.activityLog(boardId)}?limit=${limit}&offset=${offset}`
	)
	return response.data
}
