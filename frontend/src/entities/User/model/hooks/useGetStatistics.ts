'use client'
import { useQuery } from '@tanstack/react-query'

import { getStatistics } from '../api/userApi'
import { IUserStatistics } from '../types/IUserStatistics'
import { generateLastDays } from '../utils/generateLastDays'

export const useGetStatistics = () => {
	const { data, isLoading, error } = useQuery<IUserStatistics>({
		queryKey: ['get statistics'],
		queryFn: getStatistics,
		retry: false
	})

	const days = generateLastDays(90, data?.dailyCompletedCards ?? {})

	return {
		days,
		data,
		isLoading,
		error
	}
}
