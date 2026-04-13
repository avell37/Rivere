'use client'
import { Card, CardContent, CardHeader } from '@/shared/ui/external'

import { ActivityCardProps } from '../../model/types/StatisticsProps'

import { ActivityCell } from './ActivityCell'

export const ActivityCard = ({ days, t }: ActivityCardProps) => {
	return (
		<Card className='w-full gap-2'>
			<CardHeader className='font-bold'>
				{t('activity.heading')}
			</CardHeader>
			<CardContent>
				<div className='flex flex-wrap gap-1'>
					{days.map(day => (
						<ActivityCell
							key={day.date}
							date={day.date}
							value={day.value}
							t={t}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
