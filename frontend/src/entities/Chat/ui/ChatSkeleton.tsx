import { Skeleton } from '@/shared/ui/external'

import { ChatMessagesSkeleton } from './ChatMessagesSkeleton'

export const ChatSkeleton = () => {
	return (
		<div className='flex flex-col w-full max-h-86'>
			<div className='flex-1 px-4 py-3'>
				<ChatMessagesSkeleton />
			</div>
			<div className='relative mt-2 px-2'>
				<Skeleton className='h-10 w-full rounded-md' />
				<Skeleton className='absolute bottom-2.5 right-12 size-5 rounded-sm' />
				<Skeleton className='absolute bottom-2.5 right-3 size-5 rounded-sm' />
			</div>
		</div>
	)
}
