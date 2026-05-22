import { Priority } from '@/entities/Card'

export const priorityColors: Record<string, string> = {
	LOW: 'border-green-500 bg-green-500',
	MEDIUM: 'border-yellow-500 bg-yellow-500',
	HIGH: 'border-red-500 bg-red-500'
}

export const priorityCircle: Record<string, string> = {
	LOW: 'rounded-full p-2 bg-green-500',
	MEDIUM: 'rounded-full p-2 bg-yellow-500',
	HIGH: 'rounded-full p-2 bg-red-500'
}

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
