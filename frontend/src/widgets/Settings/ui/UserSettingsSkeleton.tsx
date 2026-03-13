import { Separator, Skeleton } from '@/shared/ui/external'

export const UserSettingsSkeleton = () => {
	return (
		<div className='flex flex-col items-center justify-center px-6 py-4 gap-8 w-full'>
			<Skeleton className='h-8 w-64' />
			<div className='flex flex-col gap-6 w-full'>
				<div className='flex flex-col items-center gap-4'>
					<Skeleton className='w-64 h-64 rounded-full' />
					<Skeleton className='h-10 w-48' />
				</div>

				<Skeleton className='h-6 w-64' />
				<Separator />

				<div className='grid grid-cols-2 gap-6'>
					{Array.from({ length: 2 }).map((el, idx) => (
						<div key={idx} className='flex items-end gap-2'>
							<div className='flex flex-col gap-2 w-full'>
								<Skeleton className='h-4 w-32' />
								<Skeleton className='h-10 w-full' />
							</div>
							<Skeleton className='h-10 w-28' />
						</div>
					))}
				</div>
			</div>

			<div className='flex flex-col gap-6 w-full'>
				<Skeleton className='h-6 w-48' />
				<Separator />

				<div className='flex gap-6'>
					{Array.from({ length: 2 }).map((el, idx) => (
						<div key={idx} className='flex items-end gap-2 w-full'>
							<div className='flex flex-col gap-2 w-full'>
								<Skeleton className='h-4 w-32' />
								<Skeleton className='h-10 w-full' />
							</div>
							<Skeleton className='h-10 w-28' />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
