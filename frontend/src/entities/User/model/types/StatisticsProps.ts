'use client'
import { useTranslations } from 'next-intl'

import { ActivityDay } from './IUserStatistics'

export type TranslateValues = Record<
	string,
	string | number | boolean | undefined
>

export interface StatisticsCardProps {
	label: string
	value: number | string
	icon: React.ReactNode
}

export interface ActivityCellProps {
	date: string
	value: number
	t: ReturnType<typeof useTranslations>
}

export interface ActivityCardProps {
	days: ActivityDay[]
	t: ReturnType<typeof useTranslations>
}
