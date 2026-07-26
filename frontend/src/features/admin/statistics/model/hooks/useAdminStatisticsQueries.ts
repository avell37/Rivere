'use client'
import { useQuery } from '@tanstack/react-query'

import { useQueryApiError } from '@/shared/hooks/useQueryApiError'

import { getAdminStats } from '../api/admin-statistics.api'

export const adminStatisticsKeys = {
	all: ['admin-statistics']
}

export const useGetAdminStatistics = () => {
	const query = useQuery({
		queryKey: adminStatisticsKeys.all,
		queryFn: () => getAdminStats()
	})

	useQueryApiError(query.error, query.isError)

	return {
		stats: query.data,
		statsPending: query.isPending,
		statsError: query.isError
	}
}
