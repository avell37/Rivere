import { Skeleton } from '@/shared/ui/external'

import { ChatMessagesSkeleton } from './ChatMessagesSkeleton'

export const ChatSkeleton = () => {
	return (
		<div className='flex flex-col items-center p-4 border bg-zinc-900'>
			<div className='flex flex-col h-[450px] w-[450px]'>
				<div className='h-[400px] w-[450px] rounded-md p-2 overflow-hidden'>
					<ChatMessagesSkeleton />
				</div>

				<div className='relative mt-2'>
					<Skeleton className='h-10 w-full rounded-md' />
					<Skeleton className='absolute top-2.5 right-2 h-5 w-5 rounded-sm' />
				</div>
			</div>
		</div>
	)
}
