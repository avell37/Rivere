'use client'
import { useMemo } from 'react'

import { ICard } from '@/entities/Card'

import { cardMatchesSearch } from '../lib/cardMatchesSearch'
import { useBoardFiltersStore } from '../store/useBoardFiltersStore'

export const useFiltered = (columnCards: ICard[]) => {
	const { search, priorities, tagIds, status, deadline, assigneeId } =
		useBoardFiltersStore()

	const filteredCards = useMemo(() => {
		let result = columnCards

		if (search) {
			result = result.filter(card => cardMatchesSearch(card, search))
		}

		if (priorities.length > 0) {
			result = result.filter(c => priorities.includes(c.priority))
		}

		if (tagIds.length > 0) {
			result = result.filter(c =>
				c.tags?.some(tag => tagIds.includes(tag.id))
			)
		}

		if (status === 'active') result = result.filter(c => !c.done)
		if (status === 'done') result = result.filter(c => c.done)

		if (assigneeId) {
			result = result.filter(c => c.assigneeId === assigneeId)
		}

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
	}, [columnCards, search, priorities, tagIds, status, deadline, assigneeId])

	const isFiltered =
		search !== '' ||
		priorities.length > 0 ||
		tagIds.length > 0 ||
		status !== 'all' ||
		deadline !== 'all' ||
		assigneeId !== null

	return {
		filteredCards,
		isFiltered
	}
}
