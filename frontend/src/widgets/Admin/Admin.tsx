'use client'

import {
	StatisticsList,
	StatisticsListSkeleton,
	useGetAdminStatistics
} from '@/features/admin'

import { NavBar } from '@/shared/ui/custom'

export const Admin = () => {
	const { stats, statsPending } = useGetAdminStatistics()

	return (
		<div className='container mx-auto flex flex-col gap-6'>
			<NavBar />
			{statsPending ? (
				<StatisticsListSkeleton />
			) : (
				stats && <StatisticsList stats={stats} />
			)}
		</div>
	)
}
