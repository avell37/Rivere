'use client'
import { useQuery } from '@tanstack/react-query'

import { getAdminStats } from '../api/admin-statistics.api'

export const adminStatisticsKeys = {
	all: ['admin-statistics']
}

export const useGetAdminStatistics = () => {
	const {
		data: stats,
		isPending: statsPending,
		isError: statsError
	} = useQuery({
		queryKey: adminStatisticsKeys.all,
		queryFn: () => getAdminStats()
	})

	return {
		stats,
		statsPending,
		statsError
	}
}
