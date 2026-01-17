import { IUserStatistics } from '@/entities/User'

interface StatisticsField {
	label: string
	value: number | string
}

export const StatisticsFields = (data: IUserStatistics): StatisticsField[] => [
	{
		label: 'Выполнено карточек:',
		value: data.totalCompletedCards
	},
	{
		label: 'Текущий стрик:',
		value: `${data.currentStreakDays} дней`
	},
	{
		label: 'Рекордный стрик:',
		value: `${data.longestStreakDays} дней`
	},
	{
		label: 'Приглашено пользователей:',
		value: data.usersInvited
	}
]
