import { Card, CardContent, Skeleton } from '@/shared/ui/external'

export const StatisticsCardSkeleton = () => {
	return (
		<Card className='max-w-sm w-full gap-2'>
			<CardContent className='flex items-center flex-col gap-1 p-4'>
				<Skeleton className='h-6 w-48 rounded-md' />
				<Skeleton className='h-6 w-16 rounded-md' />
			</CardContent>
		</Card>
	)
}
