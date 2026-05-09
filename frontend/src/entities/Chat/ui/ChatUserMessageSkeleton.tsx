import { Skeleton } from '@/shared/ui/external'

export const ChatUserMessageSkeleton = () => {
	return (
		<div className='flex gap-3'>
			<Skeleton className='size-8 rounded-full' />
			<div className='flex flex-col gap-1 flex-1'>
				<div className='flex items-center gap-2'>
					<Skeleton className='h-3 w-24' />
					<Skeleton className='h-3 w-12' />
				</div>
				<div className='flex flex-col gap-1'>
					<Skeleton className='h-3 w-full max-w-[250px]' />
					<Skeleton className='h-3 w-3/4 max-w-[200px]' />
				</div>
			</div>
		</div>
	)
}
