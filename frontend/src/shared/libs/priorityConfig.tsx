import { Priority } from '@/entities/Card/model/types/CardPriority'

import { priorityCircle, priorityColors } from './priorityColors'

export const priorityOptions: Record<
	Priority,
	{
		color: string
		circle: string
		i18nKey: string
	}
> = {
	LOW: {
		color: priorityColors.LOW,
		circle: priorityCircle.LOW,
		i18nKey: 'low'
	},
	MEDIUM: {
		color: priorityColors.MEDIUM,
		circle: priorityCircle.MEDIUM,
		i18nKey: 'medium'
	},
	HIGH: {
		color: priorityColors.HIGH,
		circle: priorityCircle.HIGH,
		i18nKey: 'high'
	}
}

export const getPrioritySelectOptions = (t: (key: string) => string) =>
	(
		Object.entries(priorityOptions) as [
			Priority,
			(typeof priorityOptions)[Priority]
		][]
	).map(([priority, config]) => ({
		value: priority,
		label: t(config.i18nKey),
		icon: <div className={config.circle} />
	}))
