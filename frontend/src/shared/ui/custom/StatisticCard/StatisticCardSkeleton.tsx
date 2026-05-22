import { Skeleton } from '../../external'

export const StatisticCardSkeleton = () => {
	return (
		<div className='bg-card border rounded-xl shadow-sm p-6 w-full max-w-[375px]'>
			<div className='relative flex flex-col gap-4'>
				<Skeleton className='w-[50px] h-[50px] rounded-xl' />
				<div className='flex justify-end'>
					<Skeleton className='absolute top-0 right-0 w-20 h-8 rounded-xl' />
				</div>
				<div className='flex flex-col gap-2'>
					<Skeleton className='w-24 h-8 rounded-md' />
					<Skeleton className='w-40 h-4 rounded-md' />
				</div>
				<Skeleton className='w-full h-px' />
				<div className='flex flex-col gap-2'>
					<Skeleton className='w-full h-4 rounded-md' />
				</div>
			</div>
		</div>
	)
}
