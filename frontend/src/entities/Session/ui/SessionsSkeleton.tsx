import { Separator, Skeleton } from '@/shared/ui/external'

import { SessionListSkeleton } from './SessionListSkeleton'

export const SessionsSkeleton = () => {
	return (
		<div className='flex flex-col gap-6 w-full'>
			<Separator />

			<div className='flex justify-between items-center'>
				<Skeleton className='h-6 w-48' />
				<Skeleton className='h-10 w-40' />
			</div>

			<Separator />

			<div className='border rounded-md p-4 flex flex-col gap-8'>
				<SessionListSkeleton />
			</div>
		</div>
	)
}
