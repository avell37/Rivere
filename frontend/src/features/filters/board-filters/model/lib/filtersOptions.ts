import { Priority } from '@/entities/Card'

import { DeadlineFilter, StatusFilter } from '../store/useBoardFiltersStore'

export const PRIORITIES: {
	value: Priority
	labelKey: string
	activeClass: string
	baseClass: string
}[] = [
	{
		value: Priority.LOW,
		labelKey: 'priority.low',
		baseClass: 'border-green-500/40 text-green-600 dark:text-green-400',
		activeClass: 'bg-green-500/15 border-green-500'
	},
	{
		value: Priority.MEDIUM,
		labelKey: 'priority.medium',
		baseClass: 'border-yellow-500/40 text-yellow-600 dark:text-yellow-400',
		activeClass: 'bg-yellow-500/15 border-yellow-500'
	},
	{
		value: Priority.HIGH,
		labelKey: 'priority.high',
		baseClass: 'border-red-500/40 text-red-600 dark:text-red-400',
		activeClass: 'bg-red-500/15 border-red-500'
	}
]

export const STATUS_OPTIONS: { value: StatusFilter; labelKey: string }[] = [
	{ value: 'all', labelKey: 'board.filters.all' },
	{ value: 'active', labelKey: 'board.filters.active' },
	{ value: 'done', labelKey: 'board.filters.done' }
]

export const DEADLINE_OPTIONS: { value: DeadlineFilter; labelKey: string }[] = [
	{ value: 'all', labelKey: 'board.filters.all' },
	{ value: 'overdue', labelKey: 'board.filters.overdue' },
	{ value: 'due-soon', labelKey: 'board.filters.dueSoon' },
	{ value: 'has-deadline', labelKey: 'board.filters.hasDeadline' },
	{ value: 'no-deadline', labelKey: 'board.filters.noDeadline' }
]
