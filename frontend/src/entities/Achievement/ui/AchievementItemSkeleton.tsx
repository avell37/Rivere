import { Skeleton } from '@/shared/ui/external'

export const AchievementItemSkeleton = () => {
	return (
		<div className='flex flex-col items-center justify-center cursor-pointer gap-2'>
			<Skeleton className='w-20 h-20' />
			<Skeleton className='w-28 h-6' />
		</div>
	)
}
