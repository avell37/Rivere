import { Card, CardContent, CardHeader, Skeleton } from '@/shared/ui/external'

export const ActivitySkeleton = () => {
	return (
		<Card className='w-full gap-2'>
			<CardHeader className='font-bold'>
				<Skeleton className='w-48 h-6' />
			</CardHeader>
			<CardContent className='flex flex-wrap gap-1'>
				{Array(365)
					.fill(0)
					.map((el, idx) => (
						<Skeleton
							key={idx}
							className='w-4 h-4 rounded-sm border p-2'
						/>
					))}
			</CardContent>
		</Card>
	)
}
