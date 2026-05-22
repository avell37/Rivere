import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import { AdminStats } from '../types/AdminProps'

export const getAdminStats = async (): Promise<AdminStats> => {
	const response = await authAxios.get(`${API_URL.admin()}admin-stats`)
	return response.data
}
