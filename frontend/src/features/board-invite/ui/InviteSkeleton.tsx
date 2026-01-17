import { Skeleton } from '@/shared/ui/external'

export const InviteSkeleton = () => {
	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='relative flex flex-col gap-4 bg-zinc-800 p-6 rounded-md max-w-lg w-full'>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center gap-2'>
						<Skeleton className='w-8 h-8 rounded-full' />
						<Skeleton className='h-4 w-32' />
					</div>

					<Skeleton className='h-5 w-3/4' />
				</div>

				<Skeleton className='h-4 w-40' />

				<Skeleton className='absolute top-4 right-2 h-3 w-32' />

				<div className='flex justify-between gap-2 mt-2'>
					<Skeleton className='h-10 flex-1 rounded-md' />
					<Skeleton className='h-10 flex-1 rounded-md' />
				</div>
			</div>
		</div>
	)
}
