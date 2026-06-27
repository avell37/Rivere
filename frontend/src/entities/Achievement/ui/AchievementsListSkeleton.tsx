import { AchievementItemSkeleton } from './AchievementItemSkeleton'

export const AchievementListSkeleton = () => {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3'>
			{Array.from({ length: 16 }).map((_, idx) => (
				<AchievementItemSkeleton key={idx} />
			))}
		</div>
	)
}
