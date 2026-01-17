import { Card, CardContent } from '@/shared/ui/external'

import { StatisticsCardProps } from '../../model/types/StatisticsProps'

export const StatisticsCard = ({ label, value }: StatisticsCardProps) => {
	return (
		<Card className='max-w-sm w-full gap-2'>
			<CardContent className='flex items-center flex-col gap-1 p-4'>
				<span className='text-sm text-muted-foreground'>{label}</span>
				<span className='text-2xl font-bold'>{value}</span>
			</CardContent>
		</Card>
	)
}
