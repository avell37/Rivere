import { Flame, SquareCheckBig, Trophy, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { IUserStatistics } from '@/entities/User'

interface StatisticsField {
	label: string
	value: number | string
	icon: React.ReactNode
}

const iconWrapper = (bg: string, icon: React.ReactNode) => (
	<div className={`p-3 rounded-lg ${bg} text-white`}>{icon}</div>
)

export const StatisticsFields = (
	data: IUserStatistics,
	t: ReturnType<typeof useTranslations>
): StatisticsField[] => [
	{
		label: t('completedCards'),
		value: data.totalCompletedCards,
		icon: iconWrapper(
			'bg-linear-to-br from-green-500 to-emerald-500',
			<SquareCheckBig size={20} />
		)
	},
	{
		label: t('currentStreak'),
		value: t('days', { count: data.currentStreakDays }),
		icon: iconWrapper(
			'bg-linear-to-br from-orange-500 to-red-500',
			<Flame size={20} />
		)
	},
	{
		label: t('longestStreak'),
		value: t('days', { count: data.longestStreakDays }),
		icon: iconWrapper(
			'bg-linear-to-br from-purple-500 to-pink-500',
			<Trophy size={20} />
		)
	},
	{
		label: t('usersInvited'),
		value: data.usersInvited,
		icon: iconWrapper(
			'bg-linear-to-br from-blue-500 to-indigo-500',
			<Users size={20} />
		)
	}
]
