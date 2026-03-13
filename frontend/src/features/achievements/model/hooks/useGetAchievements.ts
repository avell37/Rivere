'use client'
import { useQuery } from '@tanstack/react-query'

import { IAchievement, getAchievements } from '@/entities/Achievement'

export const useGetAchievements = () => {
	const { data: achievements, isLoading } = useQuery<IAchievement[], unknown>(
		{
			queryKey: ['get achievements'],
			queryFn: getAchievements,
			retry: false
		}
	)

	const earnedCount = achievements?.filter(ach => ach.achievedAt).length ?? 0

	return {
		achievements,
		earnedCount,
		isLoading
	}
}
