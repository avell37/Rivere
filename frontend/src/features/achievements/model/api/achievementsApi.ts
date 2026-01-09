import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs/constants/api.config'

import { IAchievement } from '../types/IAchievement'

export const getAchievements = async (): Promise<IAchievement[]> => {
	const response = await baseAxios.get(`${API_URL.achievements()}`)
	return response.data
}
