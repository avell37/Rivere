import { Skeleton } from '@/shared/ui/external'

const SectionSkeleton = ({ destructive = false }: { destructive?: boolean }) => (
	<div className='flex flex-col gap-6'>
		<Skeleton
			className={`h-8 w-56 ${destructive ? 'bg-destructive/20' : ''}`}
		/>
		<div className='flex flex-col gap-6 bg-sidebar p-8 px-6 rounded-lg border'>
			<Skeleton className='h-32 w-full rounded-lg' />
			<Skeleton className='h-20 w-full rounded-lg' />
		</div>
	</div>
)

export const UserSettingsSkeleton = () => {
	return (
		<div className='container mx-auto flex flex-col md:flex-row items-stretch py-4 gap-6 md:gap-8 px-4'>
			<div className='md:w-56 shrink-0'>
				<div className='flex md:flex-col gap-2'>
					{[1, 2, 3, 4].map(i => (
						<Skeleton key={i} className='h-9 w-32 md:w-full rounded-md' />
					))}
				</div>
			</div>
			<div className='flex flex-col gap-6 md:gap-8 w-full'>
				<SectionSkeleton />
				<SectionSkeleton />
				<SectionSkeleton />
				<SectionSkeleton destructive />
			</div>
		</div>
	)
}
