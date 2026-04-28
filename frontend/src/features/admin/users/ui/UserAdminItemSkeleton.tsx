import { Skeleton } from '@/shared/ui/external'

export const UserAdminItemSkeleton = () => {
	return (
		<div className='grid grid-cols-[1fr_150px_200px_100px] items-center gap-4 border rounded-xl p-4'>
			<div className='flex items-center gap-4'>
				<Skeleton className='w-8 h-8 rounded-full' />
				<Skeleton className='w-24 h-4' />
			</div>

			<Skeleton className='w-20 h-8' />

			<Skeleton className='w-32 h-4' />

			<div className='flex gap-4'>
				<Skeleton className='w-4 h-4' />
				<Skeleton className='w-4 h-4' />
			</div>
		</div>
	)
}
