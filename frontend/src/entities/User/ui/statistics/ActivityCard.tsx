'use client'
import { useTranslations } from 'next-intl'

import { Card, CardContent, CardHeader } from '@/shared/ui/external'

import { ActivityCardProps } from '../../model/types/StatisticsProps'

import { ActivityCell } from './ActivityCell'

export const ActivityCard = ({ days }: ActivityCardProps) => {
	const t = useTranslations('statistics.activity')

	return (
		<Card className='max-w-sm w-full gap-2'>
			<CardHeader className='font-bold'>{t('heading')}</CardHeader>
			<CardContent>
				<div className='grid grid-cols-[repeat(15,1fr)] flex-wrap gap-1'>
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
