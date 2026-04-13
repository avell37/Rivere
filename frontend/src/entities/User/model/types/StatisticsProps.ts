import { ActivityDay } from './IUserStatistics'

export interface StatisticsCardProps {
	label: string
	value: number | string
	icon: React.ReactNode
}

export interface ActivityCellProps {
	date: string
	value: number
	t: (key: string, values?: Record<string, any>) => string
}

export interface ActivityCardProps {
	days: ActivityDay[]
	t: (key: string, values?: Record<string, any>) => string
}
