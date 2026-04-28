'use client'
import { useQuery } from '@tanstack/react-query'

import { getAdminStats } from '../api/admin-statistics.api'

export const useGetAdminStatistics = () => {
	const { data: stats } = useQuery({
		queryKey: ['get admin statistics'],
		queryFn: () => getAdminStats()
	})

	return {
		stats
	}
}
