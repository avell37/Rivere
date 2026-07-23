import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

import { CreateReportInput } from '../types/ReportTypes'

export const createReport = async (
	data: CreateReportInput
): Promise<ActionResponse> => {
	const response = await authAxios.post(API_URL.root('/reports'), data)
	return response.data
}
