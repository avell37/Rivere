import { format, subDays } from 'date-fns'

import { ActivityDay } from '../types/IUserStatistics'

export const generateLastDays = (
	days: number,
	activity: Record<string, number> = {}
): ActivityDay[] => {
	return Array.from({ length: days }).map((day, i) => {
		const date = format(subDays(new Date(), days - i - 1), 'yyyy-MM-dd')

		return {
			date,
			value: activity[date] ?? 0
		}
	})
}
