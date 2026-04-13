import { Separator, Skeleton } from '@/shared/ui/external'

export const UserSettingsSkeleton = () => {
	return (
		<div className='container mx-auto flex flex-col items-center py-4 gap-8'>
			<div className='flex flex-col gap-6 w-full'>
				<div className='flex flex-col gap-6'>
					<Skeleton className='h-8 w-72' />
					<div className='flex flex-col gap-6 bg-sidebar p-8 px-6 rounded-lg border'>
						<div className='flex justify-center'>
							<Skeleton className='w-64 h-64 rounded-full' />
						</div>
						<div className='flex gap-4'>
							{[1, 2].map(i => (
								<div
									key={i}
									className='flex items-end gap-2 w-full p-2 bg-background rounded-lg'
								>
									<div className='flex gap-4 w-full'>
										<Skeleton className='w-12 h-12 rounded-lg' />
										<div className='flex flex-col gap-2 w-full'>
											<Skeleton className='h-3 w-24' />
											<Skeleton className='h-4 w-32' />
										</div>
									</div>
									<Skeleton className='h-10 w-24' />
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-4'>
					<Skeleton className='h-8 w-48' />
					<Separator />
					<div className='flex flex-col gap-4'>
						<div className='flex justify-between items-center p-4 bg-sidebar rounded-lg border'>
							<div className='flex gap-4'>
								<Skeleton className='w-11 h-11 rounded-lg' />
								<div className='flex flex-col gap-2'>
									<Skeleton className='h-3 w-32' />
									<Skeleton className='h-4 w-48' />
								</div>
							</div>
							<Skeleton className='h-10 w-28' />
						</div>
						<div className='flex justify-between items-center p-4 bg-sidebar rounded-lg border'>
							<div className='flex gap-4'>
								<Skeleton className='w-11 h-11 rounded-lg' />
								<div className='flex flex-col gap-2'>
									<Skeleton className='h-3 w-32' />
									<Skeleton className='h-3 w-40' />
								</div>
							</div>
							<Skeleton className='h-10 w-28' />
						</div>
						<div className='flex flex-col gap-3 bg-sidebar p-4 rounded-lg border'>
							<Skeleton className='h-5 w-40' />
							{[1, 2].map(i => (
								<div
									key={i}
									className='flex justify-between items-center'
								>
									<div className='flex flex-col gap-2'>
										<Skeleton className='h-3 w-48' />
										<Skeleton className='h-3 w-32' />
									</div>

									<Skeleton className='h-8 w-20' />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
