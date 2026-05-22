import { BanDurationUnit } from '../types/AdminUserTypes'

export const banDurationOptions = (t: (key: string) => string) => [
	{
		value: BanDurationUnit.SECONDS,
		label: t('unit.seconds')
	},
	{
		value: BanDurationUnit.MINUTES,
		label: t('unit.minutes')
	},
	{
		value: BanDurationUnit.HOURS,
		label: t('unit.hours')
	},
	{
		value: BanDurationUnit.DAYS,
		label: t('unit.days')
	}
]
