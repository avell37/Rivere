import { Trophy } from 'lucide-react'

import { Separator } from '@/shared/ui/external'

import { AchievementList } from './AchievementsList'

export const Achievements = () => {
	const ach = [
		{
			id: 1,
			icon: <Trophy size={64} />,
			title: 'Начало положено',
			description: 'Создайте первую доску',
			date: 'Выдано: 21.01.2026, 14:38'
		},
		{
			id: 2,
			icon: <Trophy size={64} />,
			title: 'Начало положено',
			description: 'Создайте первую доску',
			date: 'Выдано: 21.01.2026, 14:38'
		},
		{
			id: 3,
			icon: <Trophy size={64} />,
			title: 'Начало положено',
			description: 'Создайте первую доску',
			date: 'Выдано: 21.01.2026, 14:38'
		},
		{
			id: 4,
			icon: <Trophy size={64} />,
			title: 'Начало положено',
			description: 'Создайте первую доску',
			date: 'Выдано: 21.01.2026, 14:38'
		},
		{
			id: 5,
			icon: <Trophy size={64} />,
			title: 'Дело сделано',
			description: 'Сделайте задачу',
			date: 'Выдано: 30.01.2025, 09:24'
		},
		{
			id: 6,
			icon: <Trophy size={64} />,
			title: 'Вау, колонОЧКА',
			description: 'Создайте первую колону',
			date: 'Выдано: 14.09.2024, 11:59'
		}
	]

	return (
		<div className='flex flex-col gap-4 p-4'>
			<h1 className='text-2xl font-bold'>
				Ваши достижения {ach.length}/34:
			</h1>
			<Separator />
			<div className='flex flex-wrap gap-4 p-4'>
				<AchievementList ach={ach} />
			</div>
		</div>
	)
}
