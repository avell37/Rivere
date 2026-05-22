'use client'
import { useTranslations } from 'next-intl'

import { StatisticCard } from '@/shared/ui/custom'

import { mapStatistics } from '../model/lib/statistics.mapper'
import { AdminStats } from '../model/types/AdminProps'

export const StatisticsList = ({ stats }: { stats: AdminStats }) => {
	const t = useTranslations()
	const data = mapStatistics(stats, t)

	return (
		<div className='flex flex-wrap gap-3'>
			{data?.map(stat => (
				<StatisticCard {...stat} key={stat.key} />
			))}
		</div>
	)
}
