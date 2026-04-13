import { AchievementItemSkeleton } from './AchievementItemSkeleton'

export const AchievementListSkeleton = () => {
	return (
		<div className='flex gap-4'>
			{Array.from({ length: 10 }).map((el, idx) => (
				<AchievementItemSkeleton key={idx} />
			))}
		</div>
	)
}
