'use client'

import { useGetAdminStatistics } from '@/features/admin/statistics/model/hooks/useGetAdminStatistics'
import { StatisticsList } from '@/features/admin/statistics/ui/StatisticsList'

import { NavBar } from '@/shared/ui/custom/NavBar/NavBar'

export const Admin = () => {
	const { stats } = useGetAdminStatistics()

	if (!stats) return null

	return (
		<div className='container mx-auto flex flex-col gap-6'>
			<NavBar />
			<StatisticsList stats={stats} />
		</div>
	)
}
