import { Skeleton } from '@/shared/ui/external'

export const SessionItemSkeleton = () => {
	return (
		<div className='flex justify-between items-center gap-4'>
			<div className='flex items-center gap-4'>
				<Skeleton className='h-5 w-5 rounded' />
				<Skeleton className='h-4 w-48' />
			</div>

			<div className='flex items-center gap-4'>
				<Skeleton className='h-3 w-32' />
				<Skeleton className='h-5 w-5 rounded' />
			</div>
		</div>
	)
}
