import { CardSkeleton } from '@/entities/Card'

import { Skeleton } from '@/shared/ui/external'

export const ColumnSkeleton = () => {
	return (
		<div className='w-76 flex flex-col gap-3'>
			<div className='p-4 rounded-lg bg-neutral-400 dark:bg-neutral-900 shadow'>
				<Skeleton className='h-5 w-2/3' />
			</div>

			<div className='flex flex-col gap-4'>
				{Array.from({ length: 4 }).map((el, idx) => (
					<CardSkeleton key={idx} />
				))}
			</div>
		</div>
	)
}
