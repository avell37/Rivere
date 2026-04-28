'use client'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { IAchievement, getAchievements } from '@/entities/Achievement'

type FilterType = 'all' | 'earned' | 'locked'

export const useGetAchievements = () => {
	const [filter, setFilter] = useState<FilterType>('all')
	const { data: achievements, isLoading } = useQuery<IAchievement[], unknown>(
		{
			queryKey: ['get achievements'],
			queryFn: getAchievements,
			retry: false
		}
	)
	const isEarned = (ach: IAchievement) => ach.achievedAt !== null
	const earnedCount = achievements?.filter(isEarned).length ?? 0

	const filteredAchievements = useMemo(() => {
		return achievements
			? achievements?.filter(item => {
					if (filter === 'earned') return isEarned(item)
					if (filter === 'locked') return !isEarned(item)
					return true
				})
			: []
	}, [achievements, filter])

	return {
		achievements,
		filteredAchievements,
		earnedCount,
		isLoading,
		filter,
		setFilter
	}
}
