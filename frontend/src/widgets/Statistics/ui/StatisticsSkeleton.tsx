import { ActivitySkeleton, StatisticsCardSkeleton } from '@/entities/User'

export const StatisticsSkeleton = () => {
	return (
		<div className='container mx-auto flex flex-col gap-6 p-8 px-0 w-full'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				{Array.from({ length: 4 }).map((el, idx) => (
					<StatisticsCardSkeleton key={idx} />
				))}
			</div>

			<ActivitySkeleton />
		</div>
	)
}
