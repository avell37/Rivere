'use client'

import { ActivityCard, StatisticsCard, useGetStatistics } from '@/entities/User'

import { StatisticsFields } from './StatisticsFields'
import { StatisticsSkeleton } from './StatisticsSkeleton'

export const Statistics = () => {
	const { data, isLoading, days } = useGetStatistics()

	if (isLoading || !data) return <StatisticsSkeleton />

	const fields = StatisticsFields(data)

	return (
		<div className='flex flex-col gap-6 p-4 w-full'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
				{fields.map(field => (
					<StatisticsCard
						key={field.label}
						label={field.label}
						value={field.value}
					/>
				))}
			</div>
			<div className='w-full'>
				<ActivityCard days={days} />
			</div>
		</div>
	)
}
