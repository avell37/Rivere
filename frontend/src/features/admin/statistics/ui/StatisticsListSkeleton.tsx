import { StatisticCardSkeleton } from '@/shared/ui/custom'

export const StatisticsListSkeleton = () => {
	return (
		<div className='flex flex-wrap gap-3'>
			{Array.from({ length: 5 }).map((el, idx) => (
				<StatisticCardSkeleton key={idx} />
			))}
		</div>
	)
}
