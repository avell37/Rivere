'use client'
import { useMemo, useState } from 'react'

import { IAchievement, useGetAchievements } from '@/entities/Achievement'

type FilterType = 'all' | 'earned' | 'locked'

export const useAchievements = () => {
	const [filter, setFilter] = useState<FilterType>('all')
	const { achievements, achievementsPending } = useGetAchievements()
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
		achievementsPending,
		filter,
		setFilter
	}
}
