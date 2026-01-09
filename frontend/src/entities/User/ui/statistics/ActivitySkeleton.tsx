import { Card, CardContent, CardHeader, Skeleton } from '@/shared/ui/external'

export const ActivitySkeleton = () => {
	return (
		<Card className='max-w-sm w-full gap-2'>
			<CardHeader className='font-bold'>
				<Skeleton className='w-48 h-6' />
			</CardHeader>
			<CardContent className='grid grid-cols-[repeat(15,1fr)] flex-wrap gap-1'>
				{Array(90)
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
