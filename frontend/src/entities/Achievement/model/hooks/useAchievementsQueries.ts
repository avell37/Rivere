'use client'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { getAchievements } from '../api/achievementsApi'
import { IAchievement } from '../types/IAchievement'

export const achievementsKeys = {
	all: ['achievements']
}

export const useGetAchievements = () => {
	const {
		data: achievements,
		isLoading: achievementsPending,
		isError: achievementsError
	} = useQuery<IAchievement[], AxiosError>({
		queryKey: achievementsKeys.all,
		queryFn: getAchievements,
		retry: false
	})

	return {
		achievements,
		achievementsPending,
		achievementsError
	}
}
