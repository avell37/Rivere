import { Skeleton } from '@/shared/ui/external'

export const ChatUserMessageSkeleton = ({ isMy }: { isMy?: boolean }) => {
	return (
		<div
			className={`flex ${isMy ? 'justify-end ml-10' : 'justify-start mr-10'}`}
		>
			<div className='w-[350px]'>
				<div
					className={`p-2 border rounded ${
						isMy
							? 'rounded-l-2xl rounded-r-md'
							: 'rounded-l-md rounded-r-2xl'
					}`}
				>
					<Skeleton className='h-4 w-3/4 mb-2' />
					<Skeleton className='h-3 w-1/3 ml-auto' />
				</div>
			</div>
		</div>
	)
}
