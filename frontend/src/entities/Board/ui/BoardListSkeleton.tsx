import { BoardItemSkeleton } from './BoardItemSkeleton'

export const BoardListSkeleton = () => {
	return (
		<div className='flex flex-wrap gap-4'>
			{Array.from({ length: 6 }).map((el, idx) => (
				<BoardItemSkeleton key={idx} />
			))}
		</div>
	)
}
