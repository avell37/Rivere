import { Skeleton } from '@/shared/ui/external'

export const AchievementItemSkeleton = () => {
	return (
		<div className='rounded-2xl border border-border bg-card shadow-sm p-4 flex flex-col gap-3'>
			<Skeleton className='w-11 h-11 rounded-xl' />
			<div className='flex flex-col gap-1.5'>
				<Skeleton className='w-3/4 h-4 rounded-md' />
				<Skeleton className='w-full h-3 rounded-md' />
				<Skeleton className='w-2/3 h-3 rounded-md' />
			</div>
			<div className='flex flex-col gap-1.5 mt-auto'>
				<Skeleton className='w-full h-1.5 rounded-full' />
				<Skeleton className='w-10 h-3 rounded-md' />
			</div>
		</div>
	)
}
