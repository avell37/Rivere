import { Card, CardContent } from '@/shared/ui/external'

import { StatisticsCardProps } from '../../model/types/StatisticsProps'

export const StatisticsCard = ({ label, value, icon }: StatisticsCardProps) => {
	return (
		<Card className='w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]'>
			<CardContent className='flex items-center gap-4 p-4'>
				{icon}
				<div className='flex flex-col'>
					<span className='text-2xl font-bold'>{value}</span>
					<span className='text-sm text-muted-foreground '>
						{label}
					</span>
				</div>
			</CardContent>
		</Card>
	)
}
