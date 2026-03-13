import { Skeleton, useSidebar } from '@/shared/ui/external'

export const BoardHeaderActionsSkeleton = () => {
	const { state } = useSidebar()

	return (
		<div className='fixed items-center px-4 py-3 w-full bg-zinc-700/30 backdrop-blur-md'>
			<div
				className={`inline-flex items-center justify-between mx-auto w-full transition-all
					${state === 'collapsed' ? 'max-w-[1900px]' : 'max-w-[1620px]'}`}
			>
				<Skeleton className='h-6 w-48' />
				<div className='flex items-center gap-2'>
					<Skeleton className='h-8 w-8 rounded-md' />
					<Skeleton className='h-8 w-8 rounded-md' />
					<Skeleton className='h-8 w-8 rounded-md' />
				</div>
			</div>
		</div>
	)
}
