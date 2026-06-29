import { useMemo } from 'react'

import { ICard } from '@/entities/Card'

import { useBoardFiltersStore } from '../store/useBoardFiltersStore'

export const useFiltered = (columnCards: ICard[]) => {
	const { search, priorities, status, deadline } = useBoardFiltersStore()

	const filteredCards = useMemo(() => {
		let result = columnCards

		if (search) {
			const q = search.toLowerCase()
			result = result.filter(
				c =>
					c.title.toLowerCase().includes(q) ||
					c.description?.toLowerCase().includes(q)
			)
		}

		if (priorities.length > 0) {
			result = result.filter(c => priorities.includes(c.priority))
		}

		if (status === 'active') result = result.filter(c => !c.done)
		if (status === 'done') result = result.filter(c => c.done)

		if (deadline !== 'all') {
			const now = new Date()
			const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
			if (deadline === 'overdue') {
				result = result.filter(
					c => c.deadline && !c.done && new Date(c.deadline) < now
				)
			} else if (deadline === 'due-soon') {
				result = result.filter(
					c =>
						c.deadline &&
						!c.done &&
						new Date(c.deadline) >= now &&
						new Date(c.deadline) < tomorrow
				)
			} else if (deadline === 'has-deadline') {
				result = result.filter(c => !!c.deadline)
			} else if (deadline === 'no-deadline') {
				result = result.filter(c => !c.deadline)
			}
		}

		return result
	}, [columnCards, search, priorities, status, deadline])

	const isFiltered =
		search !== '' ||
		priorities.length > 0 ||
		status !== 'all' ||
		deadline !== 'all'

	return {
		filteredCards,
		isFiltered
	}
}
