'use client'

import { useTranslations } from 'next-intl'

import { ActivityCard, StatisticsCard, useGetStatistics } from '@/entities/User'

import { StatisticsFields } from './StatisticsFields'
import { StatisticsSkeleton } from './StatisticsSkeleton'

export const Statistics = () => {
	const t = useTranslations('statistics')
	const { data, isLoading, days } = useGetStatistics()

	if (isLoading || !data) return <StatisticsSkeleton />

	const fields = StatisticsFields(data, t)

	return (
		<div className='container mx-auto flex flex-col gap-6 p-8 px-0 w-full'>
			<div className='flex flex-wrap gap-4'>
				{fields.map(field => (
					<StatisticsCard
						key={field.label}
						label={field.label}
						value={field.value}
						icon={field.icon}
					/>
				))}
			</div>

			<div className='w-full'>
				<ActivityCard days={days} t={t} />
			</div>
		</div>
	)
}
