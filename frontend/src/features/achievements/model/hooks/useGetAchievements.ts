'use client'
import { useQuery } from '@tanstack/react-query'

import { getAchievements } from '../api/achievementsApi'
import { IAchievement } from '../types/IAchievement'

export const useGetAchievements = () => {
	const { data, isLoading } = useQuery<IAchievement[]>({
		queryKey: ['get achievements'],
		queryFn: getAchievements,
		retry: false
	})

	return {
		data,
		isLoading
	}
}
