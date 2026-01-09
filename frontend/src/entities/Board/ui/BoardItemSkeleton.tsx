import { Skeleton } from '@/shared/ui/external'

export const BoardItemSkeleton = () => {
	return (
		<div className='flex flex-col rounded-md overflow-hidden min-w-[200px] h-30'>
			<Skeleton className='h-30 rounded-t-md' />

			<div className='p-2 flex flex-col gap-1 bg-zinc-800/80'>
				<Skeleton className='h-4 w-3/4' />
				<Skeleton className='h-3 w-1/2' />
			</div>
		</div>
	)
}
