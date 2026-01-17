import { ActivityDay } from './IUserStatistics'

export interface StatisticsCardProps {
	label: string
	value: number | string
}

export interface ActivityCellProps {
	date: string
	value: number
	t: (key: string) => string
}

export interface ActivityCardProps {
	days: ActivityDay[]
}
