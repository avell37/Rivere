import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import { IAchievement } from '../types/IAchievement'

export const getAchievements = async (): Promise<IAchievement[]> => {
	const response = await authAxios.get(`${API_URL.achievements()}`)
	return response.data
}
