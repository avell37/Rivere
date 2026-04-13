import { Button, Skeleton } from '@/shared/ui/external'

export const UserMenuSkeleton = () => {
	return (
		<div className='p-2'>
			<Button
				variant='ghost'
				className='w-full flex items-center gap-2 p-2'
				disabled
			>
				<Skeleton className='h-8 w-8 rounded-full' />
				<div className='flex flex-col gap-1 flex-1'>
					<Skeleton className='h-4 w-24' />
					<Skeleton className='h-3 w-32' />
				</div>
				<Skeleton className='h-4 w-4 ml-auto' />
			</Button>
		</div>
	)
}
