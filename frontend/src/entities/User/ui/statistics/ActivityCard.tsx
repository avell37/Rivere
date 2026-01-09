'use client'
import { Card, CardContent, CardHeader } from '@/shared/ui/external'

import { ActivityDay } from '../../model/types/IUserStatistics'

import { ActivityCell } from './ActivityCell'

interface ActivityCardProps {
	days: ActivityDay[]
}

export const ActivityCard = ({ days }: ActivityCardProps) => {
	return (
		<Card className='max-w-sm w-full gap-2'>
			<CardHeader className='font-bold'>
				Ваша активность за последние 90 дней:
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-[repeat(15,1fr)] flex-wrap gap-1'>
					{days.map(day => (
						<ActivityCell
							key={day.date}
							date={day.date}
							value={day.value}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
