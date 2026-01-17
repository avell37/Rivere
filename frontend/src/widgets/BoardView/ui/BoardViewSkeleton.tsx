import { ColumnSkeleton } from '@/entities/Column'

import { BoardHeaderActionsSkeleton } from './BoardHeaderActionsSkeleton'

export const BoardViewSkeleton = () => {
	return (
		<div className='relative h-full w-full'>
			<BoardHeaderActionsSkeleton />

			<div className='flex gap-6 p-4 h-full pt-20 overflow-auto'>
				{Array.from({ length: 4 }).map((el, idx) => (
					<ColumnSkeleton key={idx} />
				))}
			</div>
		</div>
	)
}
