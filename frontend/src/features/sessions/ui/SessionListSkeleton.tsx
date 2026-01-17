import { SessionItemSkeleton } from './SessionItemSkeleton'

export const SessionListSkeleton = () => {
	return (
		<div className='flex flex-col gap-4'>
			{Array.from({ length: 3 }).map((el, idx) => (
				<SessionItemSkeleton key={idx} />
			))}
		</div>
	)
}
