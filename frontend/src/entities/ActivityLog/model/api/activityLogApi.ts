import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import { IActivityLogResponse, ACTIVITY_LOG_PAGE_SIZE } from '../types/IActivityLog'

export const getBoardActivityLogApi = async (
	boardId: string,
	limit = ACTIVITY_LOG_PAGE_SIZE,
	offset = 0
): Promise<IActivityLogResponse> => {
	const response = await authAxios.get(
		`${API_URL.activityLog(boardId)}?limit=${limit}&offset=${offset}`
	)
	return response.data
}
