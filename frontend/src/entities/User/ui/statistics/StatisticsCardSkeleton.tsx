import { Card, CardContent, Skeleton } from '@/shared/ui/external'

export const StatisticsCardSkeleton = () => {
	return (
		<Card className='w-full'>
			<CardContent className='flex items-center gap-4 p-4'>
				<Skeleton className='h-12 w-14 rounded-md' />
				<div className='flex flex-col gap-2 w-full'>
					<Skeleton className='h-6 w-16 rounded-md' />
					<Skeleton className='h-4 w-24 rounded-md' />
				</div>
			</CardContent>
		</Card>
	)
}
