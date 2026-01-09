'use client'
import { useGetStatistics } from '@/entities/User/model/hooks/useGetStatistics'
import { ActivityCard } from '@/entities/User/ui/statistics/ActivityCard'
import { ActivitySkeleton } from '@/entities/User/ui/statistics/ActivitySkeleton'
import { StatisticsCard } from '@/entities/User/ui/statistics/StatisticsCard'

import { Spinner } from '@/shared/ui/external/Spinner/Spinner'

export const Statistics = () => {
	const { data, isLoading, days } = useGetStatistics()

	if (isLoading || !data) {
		return (
			<div className='flex justify-center items-center h-full'>
				<Spinner className='size-16' />
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-6 p-4 w-full'>
			<div className='w-full flex gap-5'>
				<StatisticsCard
					content={`Количество выполненных карточек: ${data.totalCompletedCards}`}
				/>
				<StatisticsCard
					content={`Текущий стрик: ${data.currentStreakDays} дней`}
				/>
				<StatisticsCard
					content={`Рекордный стрик: ${data.currentStreakDays} дней`}
				/>
				<StatisticsCard
					content={`Пользователей приглашено в доску: ${data.usersInvited}`}
				/>
			</div>
			<div className='w-full'>
				<ActivityCard days={days} />
			</div>
		</div>
	)
}
