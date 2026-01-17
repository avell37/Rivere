import { Skeleton } from '@/shared/ui/external'

export const CardSkeleton = () => {
	return (
		<div className='p-6 rounded-lg bg-neutral-400 dark:bg-neutral-900 shadow'>
			<Skeleton className='h-4 w-3/4 mb-3' />
			<Skeleton className='h-3 w-full mb-2' />
			<Skeleton className='h-3 w-1/2' />
		</div>
	)
}
